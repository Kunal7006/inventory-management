from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI

from app.database import Base
from app.database import engine

from app.models.product import Product
from app.models.customer import Customer

from app.routes.product import router as product_router
from app.routes.customer import router as customer_router
from app.models.order import Order
from app.models.order_item import OrderItem

from app.routes.order import router as order_router





Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Inventory Management API"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173",
                   "https://inventory-management-ruddy-two.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)


@app.get("/")
def home():
    return {
        "message": "Inventory API Running"
    }