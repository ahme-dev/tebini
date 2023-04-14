use std::net::SocketAddr;

use axum::extract::{Path, Query};
use axum::response::{Html, IntoResponse};
use axum::routing::get;
use axum::Router;
use serde::Deserialize;

#[tokio::main]
async fn main() {
    let router = Router::new().merge(hello_router());

    // start server
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Listening on http://{}/", addr);
    axum::Server::bind(&addr)
        .serve(router.into_make_service())
        .await
        .unwrap();
}

// router for hello routes
fn hello_router() -> Router {
    Router::new()
        .route("/hello", get(hello_controller))
        .route("/hello/:name", get(hello2_controller))
}

#[derive(Debug, Deserialize)]
struct HelloQuery {
    name: Option<String>,
}

// query handling
async fn hello_controller(query: Query<HelloQuery>) -> impl IntoResponse {
    let name = query.name.as_deref().unwrap_or("World");

    Html(format!("Hello, {}!", name))
}

// path handling
async fn hello2_controller(Path(name): Path<String>) -> impl IntoResponse {
    Html(format!("Hello, {}!", name))
}
