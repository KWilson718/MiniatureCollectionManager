import { Stack, Divider } from "@mui/material";
import ListItem from "./listItem";

export default function FilterListComponent({ items }) {
    if (!Array.isArray(items)) {
        console.log("Items Set to ", items);
        return <div>No items available</div>; // or some fallback UI
    }

    return (
        <Stack
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
            sx={{
                width: 1/2
            }}
        >
            {items.map((item) => (
                <ListItem key={item.id} title={item.title} />
            ))}
        </Stack>
    );
}
