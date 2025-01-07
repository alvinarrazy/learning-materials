# Kesimpulan

Membuat aplikasi yang butuh login, ada 2 flow:

- Aplikasi membolehkan unauthorized user, untuk membuka halaman utama (unprotected route)
- Aplikasi mengharuskan kita untuk login (protected route)

Flow ketika user mengakses halaman dilindungi (protected route):

1. User mengakses halaman dilindungi
2. User diarahkan ke halaman login
3. User menginput kredensial login
4. Token diterima, lalu token disimpan di browser (cookies/localStorage/sessionStorage)
5. User masuk ke halaman yang dilindungi
6. Semua API calls akan menggunakan header `Authorization: 'Bearer {token}'`
7. Ketika masa expired token habis, user akan membuat API calls dengan expired token, kemudian server akan mengembalikan status 401
8. Hapus token dari browser (cookies/localStorage/sessionStorage), kembalikan user ke halaman login
