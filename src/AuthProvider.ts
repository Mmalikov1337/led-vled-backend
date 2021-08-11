import { AuthProvider } from "react-admin";

function getAuthProvider(apiUrl: string) {
	const authProvider: AuthProvider = {
		login: ({ username, password }) => {
			const request = new Request(`${apiUrl}/auth/authenticate`, {
				method: "POST",
				body: JSON.stringify({ username, password }),
				headers: new Headers({ "Content-Type": "application/json" }),
			});
			return fetch(request)
				.then((response) => {
					if (response.status < 200 || response.status >= 300) {
						throw new Error(response.statusText);
					}
					const res = response.json();
					// console.log("res", res);

					return res;
				})
				.then((res) => {
					// const decodedToken = decodeJwt(token);
					console.log("thenres",res);
					
					const { token } = res;
					localStorage.setItem("token", token);
					// localStorage.setItem('permissions', decodedToken.permissions);
				});
		},
		logout: () => {
			localStorage.removeItem("token");
			// localStorage.removeItem('permissions');
			return Promise.resolve();
		},
		checkError: async (error) => {
			// ...
		},
		checkAuth: () => {
			console.log("check auth");
			const token = localStorage.getItem("token");
			const request = new Request(`${apiUrl}/auth/checkAuth`, {
				method: "POST",
				body: JSON.stringify({ token }),
				headers: new Headers({ "Content-Type": "application/json" }),
			});
			return fetch(request).then((response) => {
				// if (response.status < 200 || response.status >= 300) {
				//     throw new Error(response.statusText);
				// }
				console.log(response);
				if (response.status == 200) {
					return Promise.resolve();
				} else {
					return Promise.reject();
				}
			});
		},
		getPermissions: () => {
			const role = localStorage.getItem("permissions");
			return role ? Promise.resolve(role) : Promise.reject();
		},
	};
	return authProvider;
}

export default getAuthProvider;
