// src/components/Footer.jsx
function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 text-center text-sm py-4 text-gray-600 dark:text-gray-300 mt-10">
      © {new Date().getFullYear()} Fatura.io • Tüm hakları saklıdır.
    </footer>
  );
}

export default Footer;
