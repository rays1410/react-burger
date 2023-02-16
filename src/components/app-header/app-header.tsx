import headerStyles from "./app-header.module.css";
import "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

const AppHeader = () => {
  return (
    <header role="banner" className={headerStyles.header}>
      <div className={headerStyles.headerContent}>
        <div className={headerStyles.headerLeft}>
          <div className={headerStyles.headerItem}>
            <Link
              to="/"
              className={`${headerStyles.headerLink} text text_type_main-default`}
            >
              <BurgerIcon type="primary" />
              Конструктор
            </Link>
          </div>

          <div className={headerStyles.headerItem}>
            <Link
              to="/"
              className={`${headerStyles.headerLink} ${headerStyles.disabled} text text_type_main-default text_color_inactive`}
            >
              <ListIcon type="secondary" />
              Лента заказов
            </Link>
          </div>
        </div>

        <div className={headerStyles.headerLogo}>
          <Logo />
        </div>

        <div className={headerStyles.headerRight}>
          <div className={headerStyles.headerItem}>
            <Link
              to="/profile"
              className={`${headerStyles.headerLink} text text_type_main-default text_color_active`}
            >
              <ProfileIcon type="secondary" />
              Личный кабинет
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
