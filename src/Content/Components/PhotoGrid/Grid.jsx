import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

function PhotoGridGenerator({ array, action }) {
    return (
        <Grid divided='vertically'>
            {dividir(array).map((photos, index) => {
                return (
                    <Grid.Row key={index}>
                        {
                            photos.map((photo, index) => <Grid.Column key={index} width={4}>
                                <Image onClick={() => action(photo)} src={photo.thumbnailUrl}/>
                            </Grid.Column>)
                        }
                    </Grid.Row>
                )
            })}
        </Grid>
    )
}

function dividir(array) {
    let array1 = [];
    let array2 = [];
    let array3 = [];
    array.forEach(function (e, i) {
        if (i % 12 < 4) {
            array1.push(e);
        } else if (i % 12 < 8) {
            array2.push(e);
        } else if (i % 12 < 12) {
            array3.push(e);
        }
    })
    return [array1, array2, array3];
}

export default PhotoGridGenerator