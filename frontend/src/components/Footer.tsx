export default function Footer() {
  return (
    <footer className="py-10 border-t text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Polymer Trading Platform. All rights reserved.
    </footer>
  );
}