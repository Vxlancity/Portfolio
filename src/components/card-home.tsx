import CardGrid from "./card-grid";
import Card from "./card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faCodeBranch,
  faCube,
  faCartShopping,
  faLaptopCode,
} from "@fortawesome/free-solid-svg-icons";

export default function CardHome() {
  return (
    <CardGrid>
      <Card
        icon={<FontAwesomeIcon icon={faLaptopCode} className="w-8 h-8" />}
        title="Custom Websites"
        image="/emojis/kuromi_love.gif"
        description="Ich erstelle individuelle Webseiten & Web-Apps komplett kostenfrei auf Anfrage – freiwillige Spenden oder Trinkgelder nehme ich aber gerne entgegen."
        hoverColor="#E31B23"
        route="/contact"
        badge="Kostenfrei"
      />

      <Card
        icon={<FontAwesomeIcon icon={faCube} className="w-8 h-8" />}
        title="Aera Craft"
        image="/emojis/kuromi_ghost.gif"
        description="Ein evolutionäres Minecraft-Konzept über 4 Epochen: Vom primitiven Steinzeit-Survival bis zum hochtechnologisierten Fraktionskrieg. Co-owned mit xTobiiLIve."
        hoverColor="#EAB308"
      />

      <Card
        icon={<FontAwesomeIcon icon={faGithub} className="w-8 h-8" />}
        title="GitHub Profile"
        image="/emojis/cina_walk.gif"
        description="Here you can explore my repositories, open-source work, and upcoming projects."
        hoverColor="#431266"
        href="https://github.com/Vxlancity"
      />

      <Card
        icon={<FontAwesomeIcon icon={faCodeBranch} className="w-8 h-8" />}
        title="Source Code"
        image="/emojis/kuromi_blush.gif"
        description="This is the source code of this website, feel free to check it out and understand how it works."
        hoverColor="#7348e2"
        href="https://github.com/Vxlancity/Portfolio"
      />



      <Card
        icon={<FontAwesomeIcon icon={faCartShopping} className="w-8 h-8" />}
        title="Vxlancity Store"
        image="/emojis/kuromi_roll.gif"
        description="Moderne E-Commerce-Plattform mit Apple-Style Interaktionen. Eingestellt nach insgesamt über 25.000 € Umsatz."
        hoverColor="#06B6D4"
        archived={true}
        badge="Discontinued"
      />
    </CardGrid>
  );
}
