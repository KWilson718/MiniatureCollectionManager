export async function generateItemsArray(entityGroup: Array<any>){
    let items: Array<any> = [];

    for (let i = 0; i < entityGroup.length; i++){
        let entity = entityGroup[i];
        let item = {
            key: entity.id,
            title: entity.name,
        };
        items.push(item);
        items.push(
            {
                type: "divider",
                inset: false
            }
        );
    }

    return items;
}