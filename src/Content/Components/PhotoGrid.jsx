import React, { useEffect, useState } from 'react'
import { Divider, Dimmer, Loader } from 'semantic-ui-react'
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import PhotoGridGenerator from './PhotoGrid/Grid'
import { photoActions } from '../../actions'
import { modalActions } from '../../actions/modal.actions';
import PhotoModal from './PhotoGrid/Modal';

const ITEMS_PER_PAGE = 12;
const InlineStyle = () => (
  <style>
    {`
    .main {
        width: 80%;
        margin: auto;
    }
    .grid {
      position: relative;
    }
    .grid:before {
      background-color: #F0F0F0;
      box-shadow: 0px 0px 0px 1px #DDDDDD inset;
      content: '';
      height: calc(100% - 2rem);
      left: 1rem;
      top: 1rem;
      position: absolute;
      width: calc(100% - 2rem);
     }
    .ui.divided.grid:before, .celled.grid:before {
      display: none;
    }
    .ui.aligned .column:after {
      display: none !important;
    }
    .grid .column:not(.row):not(.grid):after {
      background-color: rgba(86, 61, 124, .15);
      box-shadow: 0px 0px 0px 1px rgba(86, 61, 124, 0.2) inset;
      content: '';
      display: block;
      min-height: 50px;
    }
    @media only screen and (max-width: 768px) {
      .stackable.grid:before {
        width: 100%;
        left: 0em;
      }
    }
  `}
  </style>
)

function PhotoGrid() {
  const dispatch = useDispatch();
  const [pagesCount, setPagesCount] = useState(0);
  const [offset, setOffset] = useState(1);
  const { photos: { 
      items: photos = [],
      view: filter = 'all',
      loading: isLoading = false 
    }, modal: {
      data: modalData = null
    }, authentication :{
      user: {id}
    }} = useSelector(state => state);
  const [data, setData] = useState([])
console.log(modalData)
  const handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * ITEMS_PER_PAGE);
    setOffset(offset)
    setData(photos.slice(offset, offset + ITEMS_PER_PAGE))
  };

  useEffect(() => {
    dispatch(photoActions.getAll(filter, id))
  }, [filter]);

  const modalAction = (data) => {
    return dispatch(modalActions.open(data))
  }
  const modalOnClose = () => {
    return dispatch(modalActions.close())
  }

  useEffect(() => {
    const pages = Math.ceil(photos.length / ITEMS_PER_PAGE)
    setPagesCount(pages);
    const on = offset - 1;
    setData(photos.slice(on, on + ITEMS_PER_PAGE))
  }, [photos.length]);

  return (
    <div className="main" id="react-paginate">
      <InlineStyle />
      <Divider horizontal section style={{ color: 'white' }}>
        Photo Grid
      </Divider>
      {
        isLoading ?
          <Dimmer active>
            <Loader indeterminate>Loading photos</Loader>
          </Dimmer> :
          <PhotoGridGenerator action={modalAction} array={data} />
      }
      <Divider horizontal section>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pagesCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </Divider>
      {modalData && <PhotoModal open={!!modalData} onClose={modalOnClose} data={modalData || {}} />}
    </div>
  )
}

export default PhotoGrid