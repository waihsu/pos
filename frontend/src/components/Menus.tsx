import { useContext, useRef } from "react";
import { AppContext } from "../contexts/AppContext";
import { Box } from "@mui/material";
import MenuCard from "./MenuCard";
import { motion, Variants } from "framer-motion";
import CreateNewMenu from "./CreateNewMenu";
import { getSelectedLocationId } from "../utils/getLocalStorage";

const menuCardVariants: Variants = {
  offscreen: {
    opacity: 0,
    y: 500,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      bounce: 0.1,
      duration: 0.8,
      delay: 0.1,
    },
  },
};

const Menus = () => {
  const { menus, menus_menu_categories_locations } = useContext(AppContext);
  const ref = useRef(null);
  const locationId = getSelectedLocationId();

  const menusResult = menus_menu_categories_locations
    .filter((item) => item.locations_id === Number(locationId))
    .map((item) => item.menus_id);
  console.log(menusResult);
  const validMenus = menus.filter((item) =>
    menusResult.includes(item.id as number)
  );
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 4,
          px: 2,
        }}>
        <CreateNewMenu />
        {validMenus &&
          validMenus.map((menu) => (
            <motion.div
              key={menu.id}
              initial="offscreen"
              animate="onscreen"
              viewport={{ root: ref }}>
              <motion.div variants={menuCardVariants}>
                <Box>
                  <MenuCard
                    name={menu.name}
                    accet_url={menu.asset_url as string}
                    description={menu.description as string}
                    price={menu.price}
                  />
                </Box>
              </motion.div>
            </motion.div>
          ))}
      </Box>
    </Box>
  );
};

export default Menus;
