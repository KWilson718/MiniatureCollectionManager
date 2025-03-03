import { useState, useEffect } from "react";
import { useRouter} from "next/navigation";

import { Stack, Divider, Button, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, useTheme } from "@mui/material";
import Brand from "./brand";

export default function BrandListComponent() {
    const [brandDialogEditMode, setBradnDialogEditMode] = useState(false);
    const [brandEditPrevVal, setBrandEditPrevVal] = useState({});

    const [brandDialogOpen, setBrandDialogOpen] = useState(false);
    const [brandName, setBrandName] = useState('');
    const [brandDescription, setBrandDescription] = useState('');

    const [brandData, setBrandData] = useState({});

    const theme = useTheme();

    const router = useRouter();

    async function fetchItems() {
        const response = await fetch('/api/database?type=brand');
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        setBrandData(data);
    }

    useEffect(() => {
        fetchItems();
    }, []);

    const handleAddBrand = async () => {
        try {
            const response  = await fetch('/api/database', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'Brand',
                    data: {
                        name: brandName,
                        description: brandDescription,
                    }
                })
            });

            if (response.ok) {
                console.log('Brand Successfully Added!');
                fetchItems();
                setBrandName('');
                setBrandDescription('');
            }
            else {
                console.error('Failed to add brand.');
            }
        }
        catch (err) {
            console.error('Error Adding Brand: ', err);
        }
    }

    const handleEditBrand = async () => {
        console.log("Edit Game Submit Hit");
        try {
            const response = await fetch('/api/database', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'Brand',
                    data: {
                        id: brandEditPrevVal.id,
                        name: brandName,
                        description: brandDescription,
                    }
                })
            });

            if (response.ok) {
                console.log('Brand Successfully Edited!');
                fetchItems();
                setBrandName('');
                setBrandDescription('');
                setBrandEditPrevVal({});
            }
            else {
                console.error('Failed to edit brand');
            }
        }
        catch (err) {
            console.error("Error Editing Brand:", err);
        }
    }

    const handleBrandDialogSubmit = async () => {
        try {
            if (brandDialogEditMode) {
                handleEditBrand();
            }
            else {
                handleAddBrand();
            }
        }
        catch (err) {
            console.error("Error in Handle Brand Dialog Function", err);
        }
        
        setBrandDialogOpen(false);
    }

    const handleDeleteBrand = async (brandID) => {
        console.log("Handle Delete Brand clicked with Brand ID:", brandID);
        const brandToDelete = brandData.find(object => object.id === brandID);
        console.log("Brand To Delete:", brandToDelete);
        try {
            const response = await fetch('/api/database', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'Brand',
                    id: brandToDelete.id
                })
            });

            if (response.ok) {
                console.log('Brand Successfully Deleted');
                fetchItems();
                setBrandName('');
                setBrandDescription('');
            }
            else{
                console.error('Failed to delete brand');
                console.error('Responded with', response);
            }
        }
        catch(err) {
            console.error('Error Deleting Brand', err);
        }
    }

    const handleEditPrep = async (brandID) => {
        console.log("Handle Edit Brand clicked with Brand ID:", brandID);
        const brandToEdit = brandData.find(object => object.id === brandID);
        console.log("Editing Brand:", brandToEdit);
        setBrandEditPrevVal(brandToEdit);
        setBrandName(brandToEdit.brandName);
        setBrandDescription(brandToEdit.brandDescription || '');
        setBradnDialogEditMode(true);
        setBrandDialogOpen(true);
    }

    if (!Array.isArray(brandData)) {
        return <div><h1>Loading Brands</h1></div>;
    }

    return (
        <>
            <Stack
                spacing={1}
                divider={<Divider orientation="vertical" flexItem />}
                sx={{
                    width: 3/5,
                    marginTop: 1,
                }}
            >
                {brandData.map((brand) => (
                    <Brand key={brand.id} brandID={brand.id} title={brand.brandName} description={brand.brandDescription} editBrand={() => handleEditPrep(brand.id)} deleteBrand={() => handleDeleteBrand(brand.id)} />
                ))}
            </Stack>
            <Button
                sx={{
                    width: 1/2,
                    marginTop: 4,
                    padding: 2,
                }}
                color="secondary"
                variant="contained"
                onClick={() => {
                    console.log("Create Brand Button Clicked!");
                    setBrandDialogOpen(true);
                }}
            >
                <Typography variant="h4">Add Brand</Typography>
            </Button>

            <Dialog 
                open={brandDialogOpen} 
                onClose={() => setBrandDialogOpen(false)}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    },
                }} 
            >
                <DialogTitle>{brandDialogEditMode ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Brand Name"
                        fullWidth
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField
                        label="Brand Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={brandDescription}
                        onChange={(e) => setBrandDescription(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setBrandDialogOpen(false)} variant="contained" color="secondary">Cancel</Button>
                    <Button onClick={handleBrandDialogSubmit} variant="contained" color="secondary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
