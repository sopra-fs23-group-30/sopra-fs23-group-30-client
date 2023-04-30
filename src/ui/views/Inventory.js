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
    const connect = async () => {
      connectInventoryItems(params.id, handeItems);
      window.addEventListener("beforeunload", handleReload);
      return () => {
        window.removeEventListener("beforeunload", handleReload);
        disconnectInventoryItems();
      };
    };
    connect();
  }, [inventoryItems]);

  useEffect(() => {
    handleReload();
  }, [params.id]);

  const handeItems = async (msg) => {
    let updatedItem = JSON.parse(msg);

    const itemExists = inventoryItems.some(
      (item) => item.id === updatedItem.id
    );
    if (!itemExists) {
      setInventoryItems([...inventoryItems, updatedItem]);
    } else {
      const updatedArray = inventoryItems.map((item) => {
        if (item.id === updatedItem.id) {
          return {
            ...item,
            isSelected: updatedItem.isSelected,
            text: updatedItem.text,
          }; // Update the item with the new name
        }
        return item; // Otherwise, return the original item
      });
      setInventoryItems([].concat(updatedArray));
    }
  };

  const handleReload = async () => {
    let response = await api.get("/inventories/" + params.id);

    if (response.status !== 200) {
      toast("Fetch unsuccessful", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }
    setInventoryItems(response.data);
  };

  const handleUpdate = async (updatedItem) => {
    await api.put("/inventories/" + params.id, updatedItem);
  };

  const inventoryItem = (inventoryItem) => {
    return (
      <div key={inventoryItem.id} className="mb-4">
        <label className="flex items-center h-10 px-2 rounded" htmlFor="task_4">
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
            className="bg-gray-50 border ml-4 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Item Text"
            required
            value={inventoryItem.text}
            onChange={(e) => {
              let item = inventoryItem;
              item.text = e.target.value;
              handleUpdate(item);
            }}
          ></input>
        </label>
      </div>
    );
  };

  return (
    <div className="py-2.5 sm:px-4 rounded px-4 md:mx-48 flex flex-col gap-0">
      <p>Listers Inventory</p>

      <div className="gap-4">{inventoryItems.map((item) => inventoryItem(item))}</div>

      {/* {inventoryItems !== null && inventoryItems?.filter((item) => item.isSearcher === false)
        .map((item) => inventoryItem(item))} */}

      <p>Searchers Inventory</p>
      {/* 
      {inventoryItems !== null && inventoryItems?.filter((item) => item.isSearcher === true)
        .map((item) => inventoryItem(item))} */}
    </div>
  );
}
