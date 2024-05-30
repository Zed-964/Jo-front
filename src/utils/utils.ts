export const fetchLocalFiles = async (path: string) => {
    const response = await fetch(path);
    const data = await response.json();
    return data;
};

export const fetchAPI = async (path: string, method: string) => {
    const response = await fetch(path, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
    });
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const fetchAPIWithToken = async (
    path: string,
    method: string,
    token: string
) => {
    const response = await fetch(path, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    return data;
}

export const fetchAPIWithBody = async (
    path: string,
    method: string,
    body: any,
    token: string
) => {
    const response = await fetch(path, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    if (response.status === 204) {
        return
    }
    const data = await response.json();

    return data;
};

export const fetchAPIForToken = async (
    path: string,
    method: string,
    code: string,
    grant_type: string
) => {
    let body = new URLSearchParams({
        grant_type: grant_type,
        client_id: "tickets-front", //!Prod
        code: code,
        redirect_uri: "https://enzolouail.fr/login/result",
    });

    const response = await fetch(path, {
        method: method,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
    });

    const data = await response.json();

    return data;
};

export const fetchAPIForRefreshToken = async (
    path: string,
    method: string,
    refresh_token: string
    // grant_type: string
) => {
    let body = new URLSearchParams({
        grant_type: "refresh_token",
        client_id: "tickets-front", //!Prod
        refresh_token: refresh_token,
    });

    const response = await fetch(path, {
        method: method,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
    });

    const data = await response.json();

    return data;
};

export const fetchAPIForLogout = async (
    path: string,
    refresh_token: string
) => {
    let body = new URLSearchParams({
        client_id: "tickets-front", //!Prod
        refresh_token: refresh_token,
        grant_type: "refresh_token",
    });

    const status = await fetch(path, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
    });

    if (status.status === 204) {
        return true;
    } else {
        return false;
    }
};

export const decodeJWT = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join("")
    );

    const parsedPayload = JSON.parse(jsonPayload);
    return parsedPayload;
};

interface Owner {
    firstname: string;
    lastname: string;
}
export interface CheckoutData {
    number: number;
    holderName: string;
    expirationDate: string;
    securityCode: string;
    amount: number;
    tickets: Owner[];
}

export interface CheckoutObject {
    card: {
        number: number;
        holderName: string;
        expirationDate: string;
        securityCode: string;
    };
    amount: number;
    status: string;
    tickets: Owner[];
}

export const buildCheckoutObject = (data: CheckoutData) => {

    const checkoutObject: CheckoutObject = {
        card: {
            number: data.number,
            holderName: data.holderName,
            expirationDate: data.expirationDate,
            securityCode: data.securityCode,
        },
        amount: data.amount,
        status: "INITIALIZED",
        tickets: data.tickets,
    };

    return checkoutObject;
};
