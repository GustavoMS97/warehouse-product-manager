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
  ADJUSTMENT: { id: 7, description: 'AJUSTE' },
});

exports.PRODUCT_MOVEMENT_TYPES = Object.values(this.PRODUCT_MOVEMENT_TYPE);
