-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 04 Mar 2020 pada 12.59
-- Versi server: 10.4.11-MariaDB
-- Versi PHP: 7.4.3

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
('IVR0001', '2020-03-03 23:35:37', 'Computer', '158.140.174.53', 'Windows 10', 'Chrome 80.0.3987.122', 'Unknown Brand'),
('IVR0001', '2020-03-03 23:48:13', 'Computer', '182.1.60.169', 'Windows 10', 'Chrome 80.0.3987.122', 'Unknown Brand'),
('IVR0001', '2020-03-03 23:50:18', 'Computer', '182.1.60.169', 'Windows 10', 'Chrome 80.0.3987.122', 'Unknown Brand');

-- --------------------------------------------------------

--
-- Struktur dari tabel `access_logs_download`
--

CREATE TABLE `access_logs_download` (
  `id` char(128) NOT NULL,
  `time` varchar(1281) NOT NULL,
  `device` varchar(128) NOT NULL,
  `ip` varchar(128) DEFAULT NULL,
  `os` varchar(128) NOT NULL,
  `browser` varchar(127) NOT NULL,
  `brand` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `access_logs_download`
--

INSERT INTO `access_logs_download` (`id`, `time`, `device`, `ip`, `os`, `browser`, `brand`) VALUES
('ADM0001', '2020-03-04 00:14:07', 'Computer', '103.47.133.133', 'Windows 10', 'Chrome 80.0.3987.122', 'Unknown Brand');

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id_admin` char(128) NOT NULL,
  `username` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `image` varchar(128) NOT NULL,
  `date` varchar(128) NOT NULL,
  `position` varchar(128) NOT NULL,
  `address` text NOT NULL,
  `level` enum('superadmin','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id_admin`, `username`, `password`, `email`, `gender`, `image`, `date`, `position`, `address`, `level`) VALUES
('ADM0001', 'admin', '$2y$10$zD0z24v9sg5T6u9TDt1h8e1B/j5bDeI0prJd4b2/VjwNMT68Ivdn2', 'admin@gmail.com', 'male', '', '', 'ADMIN', '', 'superadmin');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history_access_logs`
--

CREATE TABLE `history_access_logs` (
  `id_history_access` int(11) NOT NULL,
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

INSERT INTO `history_access_logs` (`id_history_access`, `id_admin`, `name_table`, `id`, `activity`, `keterangan`, `date`) VALUES
(1, 'ADM0001', 'investor', 'IVR0001', 'INSERTED', 'MENAMBAHKAN AKUN INVESTOR1 / INVESTOR BARU', '2020-03-03 23:12:51'),
(2, 'ADM0001', 'investor', 'IVR0001', 'UPDATED', 'MENGUBAH AKUN INVESTOR INVESTOR1', '2020-03-03 23:13:27'),
(3, 'ADM0001', 'Saham', '136429', 'INSERTED', 'MEMBUAT DATA SAHAM', '2020-03-03 23:42:59'),
(4, 'ADM0001', 'investasi', '628067', 'INSERTED', 'INVESTOR INVESTOR MEMBELI 100.000 LEMBAR SAHAM ', '2020-03-03 23:45:55'),
(5, 'ADM0001', 'investor', 'IVR0002', 'INSERTED', 'MENAMBAHKAN AKUN INVESTOR2 / INVESTOR BARU', '2020-03-03 23:47:18'),
(6, 'ADM0001', 'investasi', '615292', 'Updated', 'MENTRANSFER SAHAM DARI INVESTOR DAN  MENAMBAH DATA BARU INVESTASI', '2020-03-03 23:47:39'),
(7, 'ADM0001', 'Report', '742278540', 'INSERTED', 'MEMBUAT REPORT BULAN 03', '04-03-2020 00:14:00'),
(8, 'ADM0001', 'admin', 'ADM0002', 'INSERTED', 'MENAMBAHKAN AKUN RISKI / ADMIN BARU', '2020-03-04 00:17:05'),
(9, 'ADM0002', 'News', '1968057345', 'INSERTED', 'MENAMBAH  NEWS ', '2020-03-04 00:25:33'),
(10, 'ADM0001', 'News', '170433248', 'INSERTED', 'MENAMBAH  NEWS ', '2020-03-04 00:28:12');

-- --------------------------------------------------------

--
-- Struktur dari tabel `history_transfer`
--

CREATE TABLE `history_transfer` (
  `id_history_transfer` int(11) NOT NULL,
  `id_pengirim` char(128) NOT NULL,
  `id_penerima` char(128) NOT NULL,
  `activity` varchar(128) NOT NULL,
  `jumlah_saham` int(11) NOT NULL,
  `date` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `history_transfer`
--

INSERT INTO `history_transfer` (`id_history_transfer`, `id_pengirim`, `id_penerima`, `activity`, `jumlah_saham`, `date`) VALUES
(27093, 'investor', 'investor2', 'Mentransfer Saham', 10, '2020-03-03 23:47:39');

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
('615292', 'investor2', 10, '1000000', 0.1),
('628067', 'investor', 99990, '9999000000', 999.9);

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
('IVR0001', 'investor', '$2y$10$e0rTJOIl8R0.Oyw.zJuBnePspU2hzak1m54v4/cLkNKkmQOkyYdDu', 'investor@asd.com', 'male', '5e5e82032d0e9.jpg', 'asd', '5e5e82032d9bb.jpg', '123', '5e5e82032e0ea.jpeg', '123'),
('IVR0002', 'investor2', '$2y$10$Qik9d8ggfbOwLTMnJnWMyOfgoRNlglb0gknFfHlZL5l.rIhxymtFG', 'investor2@gmail.com', 'male', '5e5e8a16698f9.jpg', 'asd', '5e5e8a166a3c8.jpg', '12', '5e5e8a166aed6.jpeg', '12');

-- --------------------------------------------------------

--
-- Struktur dari tabel `news`
--

CREATE TABLE `news` (
  `id_news` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(128) NOT NULL,
  `category` enum('daily','monthly') NOT NULL,
  `url` varchar(128) NOT NULL,
  `date` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `news`
--

INSERT INTO `news` (`id_news`, `title`, `content`, `image`, `category`, `url`, `date`) VALUES
(170433248, 'asd', '&lt;p&gt;asd&lt;/p&gt;\r\n', '5e5e93ac43dd7.jpg', 'daily', 'asd-430539969', '2020-12-04 00:28'),
(1968057345, 'newdaily1', '&lt;p&gt;1&lt;/p&gt;\r\n', '5e5e930dc0425.png', 'daily', 'newdaily1-864744950', '2020-12-04 00:25');

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
(3, 'path_portal_Investor', 'public/assets/img/investor/'),
(4, 'path_portal_News', 'public/assets/img/news/'),
(5, 'path_portal_Report', 'public/assets/img/report/'),
(6, 'path_portal_Datamanagement', 'public/assets/img/datamanagement/');

-- --------------------------------------------------------

--
-- Struktur dari tabel `report`
--

CREATE TABLE `report` (
  `id_report` int(11) NOT NULL,
  `report` varchar(128) NOT NULL,
  `date` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `report`
--

INSERT INTO `report` (`id_report`, `report`, `date`) VALUES
(742278540, '5e5e9057ed99c.pdf', '2020-03-04 00:13:59');

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
(136429, 'a', '100000', '100000', 2020);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indeks untuk tabel `history_access_logs`
--
ALTER TABLE `history_access_logs`
  ADD PRIMARY KEY (`id_history_access`);

--
-- Indeks untuk tabel `history_transfer`
--
ALTER TABLE `history_transfer`
  ADD PRIMARY KEY (`id_history_transfer`);

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
-- Indeks untuk tabel `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id_news`);

--
-- Indeks untuk tabel `portal`
--
ALTER TABLE `portal`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id_report`);

--
-- Indeks untuk tabel `saham`
--
ALTER TABLE `saham`
  ADD PRIMARY KEY (`id_saham`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `history_access_logs`
--
ALTER TABLE `history_access_logs`
  MODIFY `id_history_access` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `history_transfer`
--
ALTER TABLE `history_transfer`
  MODIFY `id_history_transfer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27094;

--
-- AUTO_INCREMENT untuk tabel `news`
--
ALTER TABLE `news`
  MODIFY `id_news` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1968057346;

--
-- AUTO_INCREMENT untuk tabel `portal`
--
ALTER TABLE `portal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT untuk tabel `report`
--
ALTER TABLE `report`
  MODIFY `id_report` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=742278541;

--
-- AUTO_INCREMENT untuk tabel `saham`
--
ALTER TABLE `saham`
  MODIFY `id_saham` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136430;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
