import { axiosService } from "./axios.service";

export const isAuthenticated = async () =>
	axiosService({
		url: "/auth/is-authenticated",
		method: "GET",
		headers: {
			token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6IjgwZGUyYTRkLWRmMDEtNGE4ZS04YjgxLTcyMzk4ZjViODQ3NiIsInJvbGUiOiJsYW5kbG9yZCIsIm5hbWUiOiJ0ZXN0MSIsImVtYWlsIjoidGVzdDFAZ21haWwuY29tIn0sImlhdCI6MTY4NTU0NzMwNywiZXhwIjoxNjg1NTUwOTA3fQ.g_7pcpjtX3sw3WwdmFFK7ETVvNRxDYnELt8EzEB2-YM",
			// 'token': localStorage.getItem('token')
		},
	});
