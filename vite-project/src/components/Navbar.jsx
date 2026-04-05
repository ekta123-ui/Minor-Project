import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";

function Navbar() {
    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">
                <Link to="/" className="flex items-center gap-3">
                    <img src={logo} alt="COLA Logo" className="h-12 drop-shadow-lg" />
                    <span className="text-white font-semibold text-xl tracking-wide">
                        COLA
                    </span>
                </Link>
            </div>
        </motion.nav>
    );
}

export default Navbar;

