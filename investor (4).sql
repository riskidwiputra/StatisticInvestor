-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 24 Feb 2020 pada 09.05
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `investor`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `access_logs`
--

CREATE TABLE `access_logs` (
  `id_investor` char(128) NOT NULL,
  `time` varchar(128) NOT NULL,
  `device` varchar(128) NOT NULL,
  `ip` varchar(128) DEFAULT NULL,
  `os` varchar(128) NOT NULL,
  `browser` varchar(128) NOT NULL,
  `brand` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `access_logs`
--

INSERT INTO `access_logs` (`id_investor`, `time`, `device`, `ip`, `os`, `browser`, `brand`) VALUES
('IVR0001', '24-02-2020 11:10:16', 'Computer', '158.140.174.87', 'Windows 10', 'Chrome 80.0.3987.116', 'Unknown Brand'),
('IVR0001', '24-02-2020 14:55:23', 'Computer', '158.140.179.247', 'Windows 10', 'Chrome 80.0.3987.116', 'Unknown Brand');

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id_admin` char(128) NOT NULL,
  `username` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id_admin`, `username`, `email`, `password`) VALUES
('ADMIN0001', 'admin', 'admin@gmail.com', '$2y$10$KbneLVlw.MG4K8/K3wem6OyhN5MnlAG9FYf9X/RHQTigohiuQYuDK');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history_access_logs`
--

CREATE TABLE `history_access_logs` (
  `id_admin` varchar(128) NOT NULL,
  `name_table` varchar(128) NOT NULL,
  `id` varchar(128) NOT NULL,
  `activity` varchar(128) NOT NULL,
  `keterangan` varchar(128) NOT NULL,
  `date` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history_access_logs`
--

INSERT INTO `history_access_logs` (`id_admin`, `name_table`, `id`, `activity`, `keterangan`, `date`) VALUES
('ADMIN0001', 'investor', 'IVR0001', 'INSERTED', 'MENAMBAHKAN AKUN INVESTOR BARU', '24-02-2020 10:08:05'),
('ADMIN0001', 'Saham', '378582', 'INSERTED', 'MENAMBAH DATA SAHAM', '24-02-2020 10:08:42'),
('ADMIN0001', 'investor', 'IVR0002', 'INSERTED', 'MENAMBAHKAN AKUN INVESTOR BARU', '24-02-2020 10:13:30'),
('ADMIN0001', 'investasi', '293240', 'INSERTED', 'MENAMBAH DATA SAHAM/MEMBELI SAHAM', '24-02-2020 10:14:00'),
('ADMIN0001', 'investasi', '15279', 'Updated', 'Mentransfer Saham Dan Menambah Data baru investasi', '24-02-2020 10:14:15'),
('ADMIN0001', 'investor', 'IVR0002', 'UPDATED', 'MENGUBAH AKUN INVESTOR ', '24-02-2020 11:08:54');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history_transfer`
--

CREATE TABLE `history_transfer` (
  `id_transfer` char(128) NOT NULL,
  `id_pengirim` char(128) NOT NULL,
  `id_penerima` char(128) NOT NULL,
  `activity` varchar(128) NOT NULL,
  `jumlah_saham` int(11) NOT NULL,
  `date` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history_transfer`
--

INSERT INTO `history_transfer` (`id_transfer`, `id_pengirim`, `id_penerima`, `activity`, `jumlah_saham`, `date`) VALUES
('419732', 'riski', 'riski2', 'Mentransfer Saham', 1000, '24-02-2020 10:14:15');

-- --------------------------------------------------------

--
-- Struktur dari tabel `investasi`
--

CREATE TABLE `investasi` (
  `id_investasi` char(128) NOT NULL,
  `id_investor` char(128) NOT NULL,
  `total_saham` int(128) NOT NULL,
  `total_harga` varchar(128) NOT NULL,
  `lot` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `investasi`
--

INSERT INTO `investasi` (`id_investasi`, `id_investor`, `total_saham`, `total_harga`, `lot`) VALUES
('15279', 'riski2', 1000, '100000000', 10),
('293240', 'riski', 9000, '900000000', 90);

-- --------------------------------------------------------

--
-- Struktur dari tabel `investor`
--

CREATE TABLE `investor` (
  `id_investor` char(128) NOT NULL,
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `image` varchar(128) NOT NULL,
  `address` varchar(128) NOT NULL,
  `image_ktp` varchar(128) NOT NULL,
  `id_ktp` varchar(128) NOT NULL,
  `image_npwp` varchar(128) NOT NULL,
  `id_npwp` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `investor`
--

INSERT INTO `investor` (`id_investor`, `username`, `password`, `email`, `gender`, `image`, `address`, `image_ktp`, `id_ktp`, `image_npwp`, `id_npwp`) VALUES
('IVR0001', 'riski', '$2y$10$73ngheDsCBglZilrNxH6PeLeq0PttLjXtt2J6viqn2z60VJy6fk1a', 'riski@sad', 'male', '5e533e1515d87.jpg', 'Jalan-jalan', '5e533e1516f29.jpg', '123124123122312', '5e533e1517f43.png', '12312412'),
('IVR0002', 'dede1', '$2y$10$Gu4Qw5hSj.nDSZ9JMATcbOIAKYGcaf0K40Usrv.TnUW6nDiifqYue', 'riski12@gmail.com2', 'male', '5e533f59cdc5b.jpg', 'asda', '5e533f59cf5dd.jpg', '1231213', '5e533f59d0905.jpg', '1231');

-- --------------------------------------------------------

--
-- Struktur dari tabel `portal`
--

CREATE TABLE `portal` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `content` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `portal`
--

INSERT INTO `portal` (`id`, `name`, `content`) VALUES
(1, 'domain', 'http://localhost/Git/StatisticInvestor'),
(2, 'portal', 'http://localhost/Git/StatisticInvestor'),
(3, 'path_portal_Investor', 'public/assets/img/investor/');

-- --------------------------------------------------------

--
-- Struktur dari tabel `saham`
--

CREATE TABLE `saham` (
  `id_saham` int(128) NOT NULL,
  `name_saham` varchar(128) NOT NULL,
  `harga_persaham` varchar(128) NOT NULL,
  `total_saham` varchar(128) NOT NULL,
  `tahun` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `saham`
--

INSERT INTO `saham` (`id_saham`, `name_saham`, `harga_persaham`, `total_saham`, `tahun`) VALUES
(378582, 'SAHAM STREAM', '100000', '10000', 2019);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indeks untuk tabel `history_transfer`
--
ALTER TABLE `history_transfer`
  ADD PRIMARY KEY (`id_transfer`);

--
-- Indeks untuk tabel `investasi`
--
ALTER TABLE `investasi`
  ADD PRIMARY KEY (`id_investasi`);

--
-- Indeks untuk tabel `investor`
--
ALTER TABLE `investor`
  ADD PRIMARY KEY (`id_investor`);

--
-- Indeks untuk tabel `portal`
--
ALTER TABLE `portal`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `saham`
--
ALTER TABLE `saham`
  ADD PRIMARY KEY (`id_saham`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `portal`
--
ALTER TABLE `portal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT untuk tabel `saham`
--
ALTER TABLE `saham`
  MODIFY `id_saham` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=378583;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
