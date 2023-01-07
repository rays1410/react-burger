import headerStyles from "./app-header.module.css";
import "@ya.praktikum/react-developer-burger-ui-components";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/logo";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header role="banner" className={headerStyles.header}>
      <div className={headerStyles.headerContent}>
        <div className={headerStyles.headerLeft}>
          <div className={headerStyles.headerItem}>
            <BurgerIcon type="primary" />
            <a
              href="/"
              className={`text text_type_main-default`}
            >
              Конструктор
            </a>
          </div>

          <div className={headerStyles.headerItem}>
            <ListIcon type="primary" />
            <a
              href="/"
              className={`text text_type_main-default text_color_inactive`}
            >
              Лента заказов
            </a>
          </div>
        </div>

        <div className={headerStyles.headerLogo}>
          <Logo />
        </div>

        <div className={headerStyles.headerRight}>
          <div className={headerStyles.headerItem}>
            <ProfileIcon type="primary" />
            <a
              href="/"
              className={`text text_type_main-default text_color_inactive`}
            >
              Личный кабинет
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;