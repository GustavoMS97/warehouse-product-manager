exports.PRODUCT_MOVEMENT_ACTION_TYPE = Object.freeze({
  ADDING: 1,
  REMOVING: 2,
  AJUSTING: 3,
});

exports.PRODUCT_MOVEMENT_TYPE = Object.freeze({
  PURCHASE: { id: 1, description: 'COMPRA', action: this.PRODUCT_MOVEMENT_ACTION_TYPE.ADDING },
  SALE: { id: 2, description: 'VENDA', action: this.PRODUCT_MOVEMENT_ACTION_TYPE.REMOVING },
  INTERNAL_CONSUMPTION: { id: 3, description: 'CONSUMO INTERNO', action: this.PRODUCT_MOVEMENT_ACTION_TYPE.REMOVING },
  FABRICATION: { id: 4, description: 'FABRICAÇÃO', action: this.PRODUCT_MOVEMENT_ACTION_TYPE.REMOVING },
  DEVOLUTION: { id: 5, description: 'DEVOLUÇÃO', action: this.PRODUCT_MOVEMENT_ACTION_TYPE.REMOVING },
  LOST_PRODUCT: { id: 6, description: 'PERDA', action: this.PRODUCT_MOVEMENT_ACTION_TYPE.REMOVING },
  ADJUSTMENT: { id: 7, description: 'AJUSTE', action: this.PRODUCT_MOVEMENT_ACTION_TYPE.AJUSTING },
  SHOPPING_CART_ADD: { id: 8, description: 'ADICIONA NO CARRINHO' },
});

exports.PRODUCT_MOVEMENT_TYPES = Object.values(this.PRODUCT_MOVEMENT_TYPE);

exports.PRODUCT_MOVEMENT_CSV_HEADERS = Object.freeze({
  documentObservation: 1,
  documentCode: 1,
  productName: 1,
  productCode: 1,
  productUnitOfMeasurement: 1,
  productProvider: 1,
  productWarehouse: 1,
  productMovementQuantity: 1,
  productMovementPrice: 1,
  productMovementType: 1,
});

exports.PRODUCT_MOVEMENT_CSV_HEADERS_ARRAY = Object.keys(this.PRODUCT_MOVEMENT_CSV_HEADERS);
