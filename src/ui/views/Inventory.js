import { api } from "helpers/api";
import {
  connectInventoryItems,
  disconnectInventoryItems,
} from "helpers/WebSocketFactory";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function Inventory() {
  
  const [inventoryItems, setInventoryItems] = useState([]);
  let params = useParams();

  useEffect(() => {   
    const fetchData = async () => {    
      await loadItemsFromBackend(params.id);
      await connectToWebSocket(params.id);
    };

    fetchData();

  }, [params.id, inventoryItem]);
  

  const connectToWebSocket = async (id) => {
    connectInventoryItems(id, handleChangedItems, handleDelete);
    window.addEventListener("beforeunload", loadItemsFromBackend);
    return () => {
      window.removeEventListener("beforeunload", loadItemsFromBackend);
      disconnectInventoryItems();
    };
  };

  const loadItemsFromBackend = async (id) => {
    let response = await api.get("/inventories/" + id);

    if (response.status !== 200) {
      toast("Fetch unsuccessful", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }
    alert("A")
    setInventoryItems([].concat(response.data))
  };

  const handleUpdate = async (updatedItem) => {
    await api.put("/inventories/" + params.id, updatedItem);
  };

  
  const handleChangedItems = async (msg) => {
    let updatedItem = JSON.parse(msg);

    const itemExists = inventoryItems.some(
      (item) => item.id === updatedItem.id
    );
    console.log(itemExists)
    console.log(inventoryItems)
    if (!itemExists) {
      alert("B")
      setInventoryItems([...inventoryItems, updatedItem]);
    } else {
      const updatedArray = inventoryItems.map((item) => {
        console.log('is Updating, not deleting')
        if (item.id === updatedItem.id) {
          return {
            ...item,
            isSelected: updatedItem.isSelected,
            text: updatedItem.text,
          };
        }
        return item;
      });
      alert("C")
      setInventoryItems([].concat(updatedArray));
    }
  };

  const handleDelete = async (toDeleteItemId) => {
    let newArr = [];
    newArr.concat(inventoryItems.filter((a) => a.id !== toDeleteItemId));
    alert("D")
    setInventoryItems(newArr);
  };

  const deleteItem = async (deleteItemId) => {
    await api.delete("/inventories/" + deleteItemId);
  };

  const inventoryItem = (inventoryItem) => {
    return (
      <div key={inventoryItem.id} className="mb-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center w-full">
            <input
              checked={inventoryItem.isSelected}
              onChange={(e) => {
                let item = inventoryItem;
                item.isSelected = !inventoryItem.isSelected;
                handleUpdate(item);
              }}
              id="checked-checkbox"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <input
              type="text"
              className={
                "bg-gray-50 border ml-4 border-gray-300 text-gray-900 text-sm rounded-lg block w-full " +
                (!inventoryItem.isSelected
                  ? "line-through text-neutral-300"
                  : "")
              }
              placeholder="Item Text"
              required
              value={inventoryItem.text}
              disabled={!inventoryItem.isSelected}
              onChange={(e) => {
                let item = inventoryItem;
                item.text = e.target.value;
                handleUpdate(item);
              }}
            ></input>
          </div>
          <p
            className="ml-4 text-sm underline text-blue-700 cursor-pointer"
            onClick={() => deleteItem(inventoryItem.id)}
          >
            Delete
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="py-2.5 sm:px-4 rounded px-4 md:mx-48 flex flex-col gap-0">
      <p className="mb-4">Listers Inventory</p>

      <div className="mb-8">
        {inventoryItems
          .filter((item) => item.isSearcher === false)
          .map((item) => inventoryItem(item))}
      </div>

      <p className="mb-4">Listers Inventory</p>

      <div className="gap-4">
        {inventoryItems
          .filter((item) => item.isSearcher === true)
          .map((item) => inventoryItem(item))}
      </div>
    </div>
  );
}
