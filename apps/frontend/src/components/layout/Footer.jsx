// src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center text-sm py-4 mt-8 border-t">
      <div className="container mx-auto">
        © {new Date().getFullYear()} TalkMaster. All rights reserved.
      </div>
    </footer>
  );
}
