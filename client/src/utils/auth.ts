export function islogin(require: boolean) {
    const token = getCookie("token");
    if (!token) return require ? logout() : false;

    try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        if (Date.now() >= exp * 1000) return logout();
    } catch {
        return logout();
    }
}

function getCookie(name: string) {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith(name + "="))
        ?.split("=")[1];
}

export function logout() {
    document.cookie = "token=; path=/; max-age=0";
    window.location.href = "/login";
}
