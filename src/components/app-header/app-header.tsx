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
            <a
              href="/"
              className={`${headerStyles.headerLink} text text_type_main-default`}
            >
              <BurgerIcon type="primary" />
              Конструктор
            </a>
          </div>

          <div className={headerStyles.headerItem}>
            <a
              href="/"
              className={`${headerStyles.headerLink} ${headerStyles.disabled} text text_type_main-default text_color_inactive`}
            >
              <ListIcon type="secondary" />
              Лента заказов
            </a>
          </div>
        </div>

        <div className={headerStyles.headerLogo}>
          <Logo />
        </div>

        <div className={headerStyles.headerRight}>
          <div className={headerStyles.headerItem}>
            <a
              href="/"
              className={`${headerStyles.headerLink} ${headerStyles.disabled} text text_type_main-default text_color_inactive`}
            >
              <ProfileIcon type="secondary" />
              Личный кабинет
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
