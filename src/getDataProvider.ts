//@ts-nocheck
import { stringify } from "query-string";
import { fetchUtils, DataProvider } from "ra-core";

import firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyCRUXX058l6G5E9cp-kVp-qonPkaYDDhYM",
	authDomain: "andante-cae72.firebaseapp.com",
	databaseURL: "https://andante-cae72.firebaseio.com",
	projectId: "andante-cae72",
	storageBucket: "andante-cae72.appspot.com",
	messagingSenderId: "820479841275",
	appId: "1:820479841275:web:695d55c976409c812e715e",
	measurementId: "G-9VDT74KD2G",
};

var appFirebase = firebase.initializeApp(firebaseConfig);

// Create a root reference
// console.log(appFirebase)
var storageRef = appFirebase.storage().ref();
// console.log(storageRef)
function getProvider(apiUrl: string, httpClient = fetchUtils.fetchJson): DataProvider {
	const provider = {
		getList: async (resource: string, params) => {
			console.log("getList_________________", resource, params);

			const { page, perPage } = params.pagination;
			const { field, order } = params.sort;
			const query = {
				...fetchUtils.flattenObject(params.filter),
				_sort: field,
				_order: order,
				_start: (page - 1) * perPage,
				_end: page * perPage,
			};
			const url = `${apiUrl}/${resource}?${stringify(query)}`;

			return httpClient(url, {
				method: "GET",
				user: {
					authenticated: true,
					token: localStorage.getItem("token"),
				},
			}).then(({ headers, json }) => {
				console.log("getList__httpClient", headers, json);

				if (!headers.has("x-total-count")) {
					throw new Error(
						"The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
					);
				}
				return {
					data: json,
					total: parseInt(headers.get("x-total-count").split("/").pop(), 10),
				};
			});
		},

		getOne: async (resource, params) => {
			console.log("getOne_________________", resource, params);

			if (resource == "orders") {
				return httpClient(`${apiUrl}/${resource}/${params.id}`, {
					method: "GET",
					user: {
						authenticated: true,
						token: localStorage.getItem("token"),
					},
				}).then(({ json }) => {
					console.log("getOne__httpClient", json);

					return {
						data: json,
					};
				});
			} else {
				return httpClient(`${apiUrl}/${resource}/${params.id}`, {
					user: {
						authenticated: true,
						token: localStorage.getItem("token"),
					},
				}).then(({ json }) => ({
					data: json,
				}));
			}
		},

		getMany: async (resource, params) => {
			console.log("getMany_________________", resource, params);

			const query = {
				id: params.ids,
			};
			const url = `${apiUrl}/${resource}?${stringify(query)}`;
			if (resource == "orders") {
				return httpClient(url, {
					method: "GET",
					user: {
						authenticated: true,
						token: localStorage.getItem("token"),
					},
				}).then(({ json }) => ({
					data: json,
					user: {
						authenticated: true,
						token: localStorage.getItem("token"),
					},
				}));
			} else {
				return httpClient(url, {
					method: "GET",
					user: {
						authenticated: true,
						token: localStorage.getItem("token"),
					},
				}).then(({ json }) => ({ data: json }));
			}
		},

		getManyReference: async (resource, params) => {
			console.log("getManyReference_________________", resource, params);

			const { page, perPage } = params.pagination;
			const { field, order } = params.sort;
			const query = {
				...fetchUtils.flattenObject(params.filter),
				[params.target]: params.id,
				_sort: field,
				_order: order,
				_start: (page - 1) * perPage,
				_end: page * perPage,
			};
			const url = `${apiUrl}/${resource}?${stringify(query)}`;

			return httpClient(url, {
				method: "GET",
				user: {
					authenticated: true,
					token: localStorage.getItem("token"),
				},
			}).then(({ headers, json }) => {
				if (!headers.has("x-total-count")) {
					throw new Error(
						"The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
					);
				}
				return {
					data: json,
					total: parseInt(headers.get("x-total-count").split("/").pop(), 10),
				};
			});
		},

		update: async (resource, params) => {
			console.log("update_________________", resource, params);
			params.previousData.image = JSON.parse(params.previousData.image)
			params.data.image = JSON.parse(params.data.image)
			if (resource == "items" || resource == "categories") {
				if (params.previousData.image) {
					console.log("params.previousData.image");
					console.log("params.data.image",params.data.image, typeof params.data.image);
					if (params.data.image) {
						console.log("params.data.image>>>>>",params.data.image.src);
						if (params.data.image.src != params.previousData.image.src) {
							console.log("params.data.image.src != params.previousData.image.src");
							//if (params.data.pucture != undefined) {
							let ref = storageRef.child(params.data.image.rawFile.path);
							let uploadTask: any = await ref.put(params.data.image.rawFile);
							// uploadTask = await uploadTask.on('state_changed')
							let download = await ref.getDownloadURL();
							params.data.image.src = download;
							console.log(download);
						} else {
							console.log("params.data.image.src == params.previousData.image.src");
						}
					} else {
						console.log("!params.data.image");
						params.data.image = "";
					}
				} else {
					console.log("!params.previousData.image");
					if (params.data.image.src) {
						console.log("!params.previousData.image params.data.image.src");
						console.log(params);
						console.log("src none");
						let ref = storageRef.child(params.data.image.rawFile.path);
						let uploadTask: any = await ref.put(params.data.image.rawFile);
						// uploadTask = await uploadTask.on('state_changed')
						let download = await ref.getDownloadURL();
						params.data.image.src = download;
						console.log(download);
					}
				}
			}
			return httpClient(`${apiUrl}/${resource}/${params.id}`, {
				method: "PUT",
				body: JSON.stringify(params.data),
				user: {
					authenticated: true,
					token: localStorage.getItem("token"),
				},
			}).then(({ json }) => ({ data: json }));
		},

		// json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
		updateMany: async (resource, params) => {
			console.log("updateMany_________________", resource, params);

			// if (params.data.picture) {
			// if (params.data.pucture != params.previousData.picture) {
			let ref = storageRef.child(params.data.picture.rawFile.path);
			let uploadTask: any = await ref.put(params.data.picture.rawFile);
			// uploadTask = await uploadTask.on('state_changed')
			let download = await ref.getDownloadURL();
			params.data.picture.src = download;
			console.log(download);
			return Promise.all(
				params.ids.map((id) =>
					httpClient(`${apiUrl}/${resource}/${id}`, {
						method: "PUT",
						body: JSON.stringify(params.data),
						user: {
							authenticated: true,
							token: localStorage.getItem("token"),
						},
					})
				)
			).then((responses) => ({ data: responses.map(({ json }) => json.id) }));
		},

		create: async (resource, params) => {
			console.log("create_________________", resource, params);

			if (resource == "items" || resource == "categories") {
				let ref = storageRef.child(params.data.picture.rawFile.path);
				let uploadTask: any = await ref.put(params.data.picture.rawFile);
				// uploadTask = await uploadTask.on('state_changed')
				let download = await ref.getDownloadURL();
				params.data.picture.src = download;
				console.log(download);
			}
			return httpClient(`${apiUrl}/${resource}`, {
				method: "POST",
				body: JSON.stringify(params.data),
				user: {
					authenticated: true,
					token: localStorage.getItem("token"),
				},
			}).then(({ json }) => ({
				data: { ...params.data, id: json.id },
			}));
		},

		delete: async (resource, params) => {
			console.log("delete_________________", resource, params);

			return httpClient(`${apiUrl}/${resource}/${params.id}`, {
				method: "DELETE",
				user: {
					authenticated: true,
					token: localStorage.getItem("token"),
				},
			}).then(({ json }) => ({ data: json }));
		},

		// json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
		deleteMany: async (resource, params) =>
			Promise.all(
				params.ids.map((id) =>
					httpClient(`${apiUrl}/${resource}/${id}`, {
						method: "DELETE",
						user: {
							authenticated: true,
							token: localStorage.getItem("token"),
						},
					})
				)
			).then((responses) => ({ data: responses.map(({ json }) => json.id) })),
	};
	return provider;
}
export default getProvider;
