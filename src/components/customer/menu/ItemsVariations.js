import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function RenderItemVariations(props){
    var { onAdd, openVariations, handleClickCloseVariations, dataItem } = props;
    const addToCart = (product, variation) => {
        product.variation = variation;
        product.variations.forEach(varia => {
            if (varia.name == variation) {
                product.price += varia.price_delta ;
            }
            
        });
        
        onAdd(product);
    };

    const [variation, setVariation] = React.useState('');
    const handleChangeVariation = (event) => {
        setVariation(event.target.value);
      };
    const resetVariation = () => {
        setVariation('');
    }
    return (
        <div>
            <Dialog
                open={openVariations}
                onClose={handleClickCloseVariations}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="select-variation-id">
                {"Please select a variation for this product"}
                </DialogTitle>
                <DialogContent>
                    
                        <Select
                        labelId="select-variation"
                        name="variations"
                        id="select-variation-id"
                        value={variation}
                        label="Variations"
                        onChange={handleChangeVariation}
                        required
                        >
                        {
                            dataItem.variations?.map((Variation) => {
                                return (
                                    <MenuItem value={Variation.name}>{ Variation.name } | {Variation.price_delta}€</MenuItem>
                                )
                            })
                        }
                        </Select>
                
                </DialogContent>
                <DialogActions>
                    { variation && <Button onClick={ () => {addToCart(dataItem, variation); resetVariation(); handleClickCloseVariations();}}>Add to Cart</Button> }

                </DialogActions>
            </Dialog>
        </div>
    )

}