use std::net::SocketAddr;

use axum::response::{Html, IntoResponse};
use axum::routing::get;
use axum::Router;

#[tokio::main]
async fn main() {
    let routes = Router::new().route("/", get(hello_controller));

    // start server
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    axum::Server::bind(&addr)
        .serve(routes.into_make_service())
        .await
        .unwrap();
}

async fn hello_controller() -> impl IntoResponse {
    Html("Hello, World!")
}
