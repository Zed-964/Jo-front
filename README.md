# JO_Temp

# JO_Front

JO_Front is a React front-end application for the Olympic Games 2024 ticketry.

## Description

This application serves as the front page for the Olympic 2024 ticketry system. It provides users with an intuitive and user-friendly interface to browse and purchase tickets for various Olympic days.

## Features

- Get a quick view of events
- Get Tickets for yourself, a duo, family and eventually more
- Add tickets to the cart and proceed to checkout
- User Authentication included

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Zed-964/JO_Front_Temp.git
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Open your browser and navigate to [http://localhost:5173](http://localhost:5173).

## Graph for the whole project

```mermaid
graph TD;
    subgraph Front
        Frontend(Frontend);
        style Frontend stroke-dasharray: 5, 5;
    end

    Frontend--> Nginx_Proxy(Nginx Proxy);

    subgraph Keycloak
        Keycloak_Node[Keycloak] <--> Keycloak_DB[(Keycloak DB)];
        style Keycloak_Node stroke-dasharray: 5, 5;
    end

    subgraph Backend
        Nginx_Proxy --> Back_Node1[Backend];
        style Back_Node1 stroke-dasharray: 5, 5;
        Nginx_Proxy --> Back_Node2[Backend];
        style Back_Node2 stroke-dasharray: 5, 5;
        Back_Node1 --> Redis_Node1[Redis];
        style Redis_Node1 stroke-dasharray: 5, 5;
        Back_Node1 <--> Common_DB[(Base De Données)];
        Back_Node2 --> Redis_Node2[Redis];
        style Redis_Node2 stroke-dasharray: 5, 5;
        Back_Node2 <--> Common_DB;
    end

    Nginx_Proxy --> Keycloak_Node;

```

## Modified Graph to be confirmed

```mermaid
graph TD;

    subgraph Front
        Frontend(Frontend);
        style Frontend stroke-dasharray: 5, 5;
    end

    Frontend--> Nginx_Proxy(Nginx Proxy);

    subgraph databases[Bases de données]
        Common_DB
        Keycloak_DB
    end

    subgraph auth[Auth]
        Keycloak_Node[Keycloak] <--> Keycloak_DB[(Keycloak DB)];
        style Keycloak_Node stroke-dasharray: 5, 5;
    end

    subgraph proxies[Proxy]
        Nginx_Proxy
        Kubernetes
        Kubernetes_Keycloak
        Nginx_Proxy --> Kubernetes(Kubernetes);
        Nginx_Proxy --> Kubernetes_Keycloak;
    end

    subgraph Backend_1[Backend];
        Kubernetes --> Back_Node1[Backend];
        
        Back_Node1 --> Redis_Node1[Redis];
        Back_Node1 <--> Common_DB[(Base De Données)];
        
        style Redis_Node1 stroke-dasharray: 5, 5;
        style Back_Node1 stroke-dasharray: 5, 5;
    end

    subgraph Backend_Global[Backend]
        Backend_1
        Backend_2
    end

    subgraph Backend_2[Backend]
        Kubernetes --> Back_Node2[Backend];

        Back_Node2 --> Redis_Node2[Redis];
        Back_Node2 <--> Common_DB;
    
        style Redis_Node2 stroke-dasharray: 5, 5;
        style Back_Node2 stroke-dasharray: 5, 5;
    end
    
    Kubernetes_Keycloak(Kubernetes) --> Keycloak_Node;
    
```

## Contributing

Contributions are closed for now.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information when it pops up.
