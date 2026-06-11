from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db

from app.models.customer import Customer
from app.models.product import Product
from app.models.order import Order
from app.models.order_item import OrderItem

from app.schemas.order import OrderCreate

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)


@router.post("/")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):

    customer = db.query(Customer)\
        .filter(Customer.id == order.customer_id)\
        .first()

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    new_order = Order(
        customer_id=order.customer_id
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for item in order.items:

        product = db.query(Product)\
            .filter(Product.id == item.product_id)\
            .first()

        if not product:
            raise HTTPException(
                status_code=404,
                detail="Product not found"
            )

        if product.stock < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Insufficient stock for {product.name}"
            )

        product.stock -= item.quantity

        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item.product_id,
            quantity=item.quantity
        )

        db.add(order_item)

    db.commit()

    return {
        "message": "Order created successfully",
        "order_id": new_order.id
    }

@router.get("/")
def get_orders(
    db: Session = Depends(get_db)
):
    return db.query(Order).all()