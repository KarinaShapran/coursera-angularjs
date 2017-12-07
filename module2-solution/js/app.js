(function () {
  'use strict';

  angular.module('ShoppingListApp', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var itemsToBuy = this;

    itemsToBuy.itemName = "";
    itemsToBuy.itemQuantity = "";
    itemsToBuy.itemState = "buy";

    itemsToBuy.addItem = function () {
      ShoppingListCheckOffService.addItem(itemsToBuy.itemName, itemsToBuy.itemQuantity, itemsToBuy.itemState);
      //Clear inputs
      itemsToBuy.itemName = "";
      itemsToBuy.itemQuantity = "";
    };

    itemsToBuy.items = ShoppingListCheckOffService.getItems();

    itemsToBuy.addToBought = function (itemIndex) {
      ShoppingListCheckOffService.addToBought(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var itemsBought = this;

    itemsBought.items = ShoppingListCheckOffService.getItemsBought();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // List of to buy items
    var items = [];

    // List of bought items
    var itemsBought = [];

    service.addItem = function (itemName, quantity, state) {
      if (itemName !== "" && quantity !== "") {
        var item = {
          name: itemName,
          quantity: quantity,
          state: state
        };
        items.push(item);
      }
    };

    service.addToBought = function (itemIndex) {
      items[itemIndex].state = "bought";
      itemsBought.push(items[itemIndex]);
      items.splice(itemIndex, 1);
    };

    service.getItems = function () {
      return items;
    };

    service.getItemsBought = function () {
      return itemsBought;
    };
  }

})();
