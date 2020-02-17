-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 17 Feb 2020 pada 10.55
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

-- --------------------------------------------------------

--
-- Struktur dari tabel `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id_admin` int(11) NOT NULL,
  `id_investor` char(128) NOT NULL,
  `activity` varchar(128) NOT NULL,
  `date` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Struktur dari tabel `investasi`
--

CREATE TABLE `investasi` (
  `id_investasi` char(128) NOT NULL,
  `id_investor` char(128) NOT NULL,
  `total_saham` int(128) NOT NULL,
  `total_harga` varchar(128) NOT NULL,
  `lot` int(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `address` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id_admin`);

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id_admin`);

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
  MODIFY `id_saham` int(128) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
