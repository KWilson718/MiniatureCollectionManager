import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Stack, Divider, Paper } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

export default function MiniatureListComponent({ factionID }) {
    const [miniatureDialogEditMode, setMiniatureDialogEditMode] = useState(false); // Create when false, Edit when true
    const [miniatureDialogOpen, setMiniatureDialogOpen] = useState(false);
    const [miniatureName, setMiniatureName] = useState('');
    const [miniatureDescription, setMiniatureDescription] = useState('');
    const [qtyNOS, setQtyNOS] = useState(0);
    const [qtyBuilt, setQtyBuilt] = useState(0);
    const [qtyPrimed, setQtyPrimed] = useState(0);
    const [qtyPartially, setQtyPartially] = useState(0);
    const [qtyBattleReady, setQtyBattleReady] = useState(0);
    const [qtyParadeReady, setQtyParadeReady] = useState(0);

    const [miniatureData, setMiniatureData] = useState({});

    const [selectedRowId, setSelectedRowId] = useState(null);
    const [selectedRowData, setSelectedRowData] = useState(null);
    
    const theme = useTheme();

    const router = useRouter();

    const fetchMiniatures = useCallback(async () => {
        try {
            const response = await fetch(`/api/database?type=miniature&factionID=${factionID}`);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setMiniatureData(data);
        } catch (error) {
            console.error('Error fetching factions:', error);
            setMiniatureData({}); // Fallback to an empty state
        }
    }, [factionID]);
    
    useEffect(() => {
        fetchMiniatures();
    }, [fetchMiniatures]);

    const handleRefreshMiniatures = () => {
        fetchMiniatures();
    };

    const handleRowSelection = (selectionModel) => {
        if (selectionModel.length > 0) {
            const selectedId = selectionModel[0]; // Get the first selected row's ID
            const rowData = miniatureData.find(row => row.id === selectedId);
            setSelectedRowId(selectedId);
            setSelectedRowData(rowData);
        } else {
            setSelectedRowId(null);
            setSelectedRowData(null);
        }
    };

    const handleEdit = () => {
        console.log("Edit row:", selectedRowData);
        
        // Sets the data from selectedRowData into the Miniature Dialog useStates
        setMiniatureName(selectedRowData.miniatureName);
        setMiniatureDescription(selectedRowData.miniatureDescription);
        setQtyNOS(selectedRowData.qtyUnassembled);
        setQtyBuilt(selectedRowData.qtyBuilt);
        setQtyPrimed(selectedRowData.qtyPrimed);
        setQtyPartially(selectedRowData.qtyPartiallyPainted);
        setQtyBattleReady(selectedRowData.qtyBattleReady);
        setQtyParadeReady(selectedRowData.qtyParadeReady);

        // Handles setup for the dialog and then opens it
        setMiniatureDialogEditMode(true);
        
        setMiniatureDialogOpen(true);

    };

    const handleDelete = async () => {
        console.log("Delete Row", selectedRowData)

        try {
            const response = await fetch('/api/database', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'Miniature',
                    id: selectedRowData.id
                })
            });

            if (response.ok){
                console.log('Miniature Successfully Deleted!');
                fetchMiniatures();
                setMiniatureName('');
                setMiniatureDescription('');
                setQtyNOS(0);
                setQtyBuilt(0); 
                setQtyPrimed(0); 
                setQtyPartially(0); 
                setQtyBattleReady(0);
                setQtyParadeReady(0);
            }
            else {
                console.error('Failed to delete miniature');
                console.error('Responded with', response);
            }
        }
        catch(err){
            console.error('Error Deleting Miniature',err);
        }
    };

    const handleCreateMiniature = async () => {
        try {
            const response  = await fetch('/api/database', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'Miniature',
                    data: {
                        parentID: factionID,
                        name: miniatureName,
                        description: miniatureDescription,
                        quantities: [qtyNOS, qtyBuilt, qtyPrimed, qtyPartially, qtyBattleReady, qtyParadeReady],
                    }
                })
            });

            if (response.ok) {
                console.log('Miniature Successfully Added!');
                fetchMiniatures();
                setMiniatureName('');
                setMiniatureDescription('');
                setQtyNOS(0);
                setQtyBuilt(0); 
                setQtyPrimed(0); 
                setQtyPartially(0); 
                setQtyBattleReady(0);
                setQtyParadeReady(0);
            }
            else {
                console.error('Failed to add miniature.');
            }
        }
        catch(err){
            console.error("Error Adding Miniature", err);
        }
    }

    const handleEditMiniature = async () => {
        try{
            const response = await fetch('/api/database', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'Miniature',
                    data: {
                        id: selectedRowData.id,
                        parentID: factionID,
                        name: miniatureName,
                        description: miniatureDescription,
                        quantities: [qtyNOS, qtyBuilt, qtyPrimed, qtyPartially, qtyBattleReady, qtyParadeReady],
                    }
                })
            });

            if (response.ok) {
                console.log('Miniature Successfully Edited!');
                fetchMiniatures();
                setMiniatureName('');
                setMiniatureDescription('');
                setQtyNOS(0);
                setQtyBuilt(0); 
                setQtyPrimed(0); 
                setQtyPartially(0); 
                setQtyBattleReady(0);
                setQtyParadeReady(0);
            }
            else {
                console.error('Failed to edit miniature.');
            }
        }
        catch(err) {
            console.error("Error Editing Miniature");
        }
    }

    const handleMiniatureDialogSubmit = async () => {
        if(miniatureDialogEditMode){
            await handleEditMiniature();
        }
        else {
            await handleCreateMiniature();
        }

        setMiniatureDialogOpen(false);
    }

    const columns = [
        {field: 'miniatureName', headerName: 'Name', flex: 1},
        {field: 'miniatureDescription', headerName: 'Description', flex: 1},
        {field: 'qtyUnassembled', headerName: 'Quantity Unassembled', flex: 1},
        {field: 'qtyBuilt', headerName: 'Quantity Built', flex: 1},
        {field: 'qtyPrimed', headerName: 'Quantity Primed', flex: 1},
        {field: 'qtyPartiallyPainted', headerName: 'Quantity Partially Painted', flex: 1},
        {field: 'qtyBattleReady', headerName: 'Quantity Battle Ready', flex: 1},
        {field: 'qtyParadeReady', headerName: 'Quantity Parade Ready', flex: 1},
        
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    if (!Array.isArray(miniatureData)) {
        return <div><h1>Loading Miniatures</h1></div>;
    }
    
    return (
        <>
            <Paper
                elevation={3}
                sx={{
                    width: 1,
                    display: "flex",
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    padding: 2,
                    marginTop: 4,
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                }}
            >
                <DataGrid 
                    rows={miniatureData}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10, 20]}
                    rowSelectionModel={selectedRowId ? [selectedRowId] : []}
                    onRowSelectionModelChange={(newSelection) => {
                        const selectedId = newSelection[0] || null; // Get the first selected row ID or null
                        const rowData = miniatureData.find(row => row.id === selectedId); // Find the row data
                        if (selectedRowId == selectedId) {
                            setSelectedRowId(null);
                            setSelectedRowData(null);
                        }
                        else {
                            setSelectedRowId(selectedId);
                            setSelectedRowData(rowData);
                        }
                    }}
                    sx={{
                        width: 1,
                        '& .MuiDataGrid-root': {
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.secondary.contrastText,
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.secondary.contrastText,
                        },
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.secondary.contrastText,
                        },
                        '& .MuiDataGrid-columnHeaderRow': {
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.secondary.contrastText,
                        },
                        '& .MuiDataGrid-cell': {
                            color: theme.palette.secondary.contrastText,
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.secondary.contrastText,
                        },
                        '& .MuiSvgIcon-root': {
                            color: theme.palette.secondary.contrastText,
                        },
                        '& .MuiDataGrid-sortIcon': {
                            color: theme.palette.secondary.contrastText,
                        },
                        '& .MuiTablePagination-root': {
                            color: theme.palette.secondary.contrastText,
                        },
                    }}
                />
            </Paper>

            {selectedRowId && (
                <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleEdit}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Stack>
            )}

            <Button
                variant="contained"
                color="secondary"
                sx={{
                    width: 1/2,
                    marginTop: 4,
                    padding: 1,
                }}
                onClick={() => {
                    console.log("Create Miniature Button Clicked!");
                    setMiniatureDialogEditMode(false);
                    setMiniatureName('');
                    setMiniatureDescription('');
                    setQtyNOS(0);
                    setQtyBuilt(0);
                    setQtyPrimed(0);
                    setQtyPartially(0);
                    setQtyBattleReady(0);
                    setQtyParadeReady(0);
                    setMiniatureDialogOpen(true);
                }}
            >
                <Typography variant='h5'>Add Miniature</Typography>
            </Button>


            <Dialog
                open={miniatureDialogOpen} 
                onClose={() => setMiniatureDialogOpen(false)}
                sx={{
                    '& .MuiPaper-root': {
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                    },
                }} 
            >
                <DialogTitle>Add New Miniature</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Miniature Name"
                        fullWidth
                        value={miniatureName}
                        onChange={(e) => setMiniatureName(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField
                        label="Miniature Description"
                        fullWidth
                        multiline
                        rows={3}
                        value={miniatureDescription}
                        onChange={(e) => setMiniatureDescription(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField 
                        label="Quantity New On Sprue"
                        fullWidth
                        value={qtyNOS}
                        onChange={(e) => setQtyNOS(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField 
                        label="Quantity Built"
                        fullWidth
                        value={qtyBuilt}
                        onChange={(e) => setQtyBuilt(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField 
                        label="Quantity Primed"
                        fullWidth
                        value={qtyPrimed}
                        onChange={(e) => setQtyPrimed(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField 
                        label="Quantity Partially Painted"
                        fullWidth
                        value={qtyPartially}
                        onChange={(e) => setQtyPartially(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField 
                        label="Quantity Battle Ready"
                        fullWidth
                        value={qtyBattleReady}
                        onChange={(e) => setQtyBattleReady(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                    <TextField 
                        label="Quantity Parade Ready"
                        fullWidth
                        value={qtyParadeReady}
                        onChange={(e) => setQtyParadeReady(e.target.value)}
                        margin="dense"
                        variant="filled"
                        color="secondary"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setMiniatureDialogOpen(false)} variant="contained" color="secondary">Cancel</Button>
                    <Button onClick={handleMiniatureDialogSubmit} variant="contained" color="secondary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}