import { Stomp } from "@stomp/stompjs";
import { getDomain } from "./getDomain";

function getWebSocketUrl() {
  const protocol = window.location.protocol;
  const domain = getDomain().split("//")[1];
  return `${protocol === "https:" ? "wss:" : "ws:"}//${domain}/ws`;
}

export const socketFactory = () => {
  return new WebSocket(`${getWebSocketUrl()}`);
};

export const openSocket = () => {
  let stompClient = Stomp.over(function () {
    return new WebSocket(`${getWebSocketUrl()}`);
  });

  stompClient.debug = (message) => {
    if (
      !message.includes("PING") &&
      !message.includes("PONG") &&
      !message.includes("Received")
    ) {
    }
  };

  stompClient.onWebSocketError = (error) => {
    console.error("WebSocket error:", error);
    setTimeout(() => {
      openSocket();
    });
  };

  stompClient.onWebSocketClose = () => {
    console.log("One of the WebSockets has closed");
    setTimeout(() => {
      openSocket();
    });
  };
  return stompClient;
};

let stompClientInventoryItems;

export const connectInventoryItems = (inventoryId, changeCallback, deletedCallback) => {
  let stompClient = openSocket();
  stompClientInventoryItems = stompClient;
  stompClient.connect({ inventoryId: inventoryId }, () => {
    stompClient.subscribe(`/inventories/` + inventoryId, (message) => {
      console.log(`Received changed message: ${message.body}`);
      changeCallback(message.body);
    });

    stompClient.subscribe(`/inventories/` + inventoryId + "/deletedItem", (message) => {    
        console.log(`Received delete message: ${message.body}`);
        deletedCallback(message.body);
      });
  });
};

export const disconnectInventoryItems = () => {
    stompClientInventoryItems.disconnect(() => {
    console.log("disconnected inventory items!");
  });
};
