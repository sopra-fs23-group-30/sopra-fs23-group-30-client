import { PlusIcon } from "@heroicons/react/20/solid";
import {
  connectInventoryItems,
  disconnectInventoryItems,
} from "helpers/WebSocketFactory";
import { api } from "helpers/api";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [isSearcher, setIsSearcher] = useState();
  let params = useParams();

  useEffect(() => {
    loadItemsFromBackend(params.id);
  }, [params.id]);

  const handleUpdate = async (updatedItem) => {
    await api.put("/inventories/" + params.id, updatedItem);
  };

  const deleteItem = async (deleteItemId) => {
    await api.delete("/inventories/" + deleteItemId);
  };

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    const claims = jwt_decode(token);
    setIsSearcher(claims.isSearcher);

    const handleDelete = async (toDeleteItemId) => {
      if (inventoryItems.length !== 0) {
        setInventoryItems(
          inventoryItems.filter((item) => item.id !== toDeleteItemId)
        );
        loadItemsFromBackend(params.id);
      } else {
        setInventoryItems([]);
      }
    };

    const handleChangedItems = async (msg) => {
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
            };
          }
          return item;
        });
        setInventoryItems([].concat(updatedArray));
      }
    };

    connectInventoryItems(params.id, handleChangedItems, handleDelete);
    window.addEventListener("beforeunload", loadItemsFromBackend);
    return () => {
      window.removeEventListener("beforeunload", loadItemsFromBackend);
      disconnectInventoryItems();
    };
  }, [inventoryItems, params.id]);

  const loadItemsFromBackend = async (id) => {
    let response = await api.get("/inventories/" + id);

    if (response.status !== 200) {
      toast("Fetch unsuccessful", {
        duration: 4000,
        position: "top-right",
        icon: "❌",
      });
    }
    setInventoryItems(response.data);
  };

  const displayInventoryItems = (isSearcherItem) =>
    inventoryItems
      .filter((item) => item.isSearcher === isSearcherItem)
      .map((item) => inventoryItem(item, isSearcherItem));

  const inventoryItem = (inventoryItem, isSearcherItem) => {
    return (
      <div key={inventoryItem.id} className="mb-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center w-full">
            {isSearcherItem && (
              <input
                disabled={isSearcher}
                checked={inventoryItem.isSelected}
                onChange={(e) => {
                  let item = inventoryItem;
                  item.isSelected = !inventoryItem.isSelected;
                  handleUpdate(item);
                }}
                id="checked-checkbox"
                type="checkbox"
                className="w-4 h-4 mr-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            )}
            <input
              type="text"
              className={
                "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full " +
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
          {((isSearcherItem && isSearcher) ||
            (!isSearcherItem && !isSearcher)) && (
            <p
              className="ml-4 text-sm underline text-blue-700 cursor-pointer"
              onClick={() => deleteItem(inventoryItem.id)}
            >
              Delete
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="py-2.5 sm:px-4 rounded px-4 md:mx-48 flex flex-col gap-0">
      <div className="flex flex-row justify-between">
        <p className="mb-4">Listers Inventory</p>
        {!isSearcher && (
          <PlusIcon
            height={25}
            color="blue"
            onClick={() => {
              api.post("/inventories", {
                inventoryId: params.id,
                isSearcher: false,
                isSelected: true,
                text: "",
              });
            }}
            className="inline-block align-middle text-blue-500"
          />
        )}
      </div>

      <div className="mb-8">{displayInventoryItems(false)}</div>

      <div className="flex flex-row justify-between">
        <p className="mb-4">Searchers Inventory</p>
        {isSearcher && (
          <PlusIcon
            height={25}
            color="blue"
            onClick={() => {
              api.post("/inventories", {
                inventoryId: params.id,
                isSearcher: true,
                isSelected: true,
                text: "",
              });
            }}
            className="inline-block align-middle text-blue-500"
          />
        )}
      </div>

      <div className="gap-4">{displayInventoryItems(true)}</div>
    </div>
  );
}
