const { GuildMember } = require("discord.js"); // IMPORTAMOS LAS DEPENDENCIAS DE DISCORD.JS
const { createCanvas, registerFont, loadImage } = require("canvas"); // DEPENDENCIAS IMPORTADAS DE CANVAS

const defaultIcon =
  "https://logodownload.org/wp-content/uploads/2017/11/discord-logo-1-1.png"; // AVATAR POR DEFECTO EN CASO EL USUARIO NO TENGA UNO
const backgroundPath = "./Assets/Images/background.png"; // IMAGEN DE LAS BIENVENIDAS
const fontPath = "./Assets/Fonts/Quicksand_Bold.otf"; // TIPO DE LETRA DE LAS BIENVENIDAS
const subtitle = "Bienvenid@ al Servidor!"; // SUB TITULO DE LAS BIENVENIDAS
const avatarRadius = 150; // DIBULAMOS EL RADIO DEL AVATAR

registerFont(fontPath, { family: "Quicksand" }); // REGISTRAMOS LA FUENTE CON SU FAMILA
/**
 *
 * @param {GuildMember} member // IMPORTAMOS EL PARAMETRO MEMBER DE GUILDMEMBER
 */
module.exports = async (member) => {
  // DATOS DEL MIEMBRO

  const username = member.user.username; // USERNAME DEL MIEMBRO QUE SE UNE AL SERVIDOR
  const avatar =
    member.user.displayAvatarURL({ size: 256, extension: "png" }) ||
    defaultIcon; // AVATAR DEL MIEMBRO QUE SE UNE AL SERVIDOR

  // CREAMOS EL LIENSO

  const canvas = createCanvas(1200, 600); // DIMENSIONES DE LA IMAGEN
  const ctx = canvas.getContext("2d"); //FONDO EN 2D

  // DIBUJAMOS EL FONDO

  // APLICAMOS SOMBREADO
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)"; // COLOR DEL SOMBREADO
  ctx.shadowBlur = 15; // CANTIDAD DE ENFOQUE DE LA SOMBRA
  ctx.shadowOffsetX = 5; // EJE X DEL SOMBREADO
  ctx.shadowOffsetY = 5; // EJE Y DEL SOMBREADO

  const margin = 20; // MARGEN DEL SOMBREADO
  const background = await loadImage(backgroundPath); // CARGAMOS EL FONDO DE LA BIENVENIDAS

  ctx.drawImage(
    background,
    margin,
    margin,
    canvas.width - margin * 2,
    canvas.height - margin * 2
  ); // COLOCAMOS EL FONDO ESTABLECIDO ANTERIORMENTE

  // DIBUJAMOS EL NOMBRE DEL USUARIO
  ctx.font = "80px Quicksand"; // TAMAÑO DE LETRA DEL NOMBRE DEL USUARIO QUE SE UNE
  ctx.fillStyle = "white"; // COLOR DE LETRA DEL NOMBRE DEL USUARIO QUE SE UNE

  ctx.shadowColor = "rgba(0, 0, 0, 0.8)"; // COLOR/ENFOQUE DE LA SOMBRA
  ctx.shadowBlur = 5; // CANTIDD DE ENFOQUE DE LA LETRA

  const usernameMetrics = ctx.measureText(username); // CARGAMOS EL NOMBRE DE USUARIO AL FONDO DE LA IMAGEN

  ctx.fillText(
    username,
    canvas.width / 2 - usernameMetrics.width / 2,
    (canvas.height * 3) / 4
  ); // DIBUJAMOS EL NOMBRE EN EL FONDO DE IMAGEN CON SU ALTURA CORRECA

  // DIBUJAMOS EL SUB TITULO

  ctx.font = "50px Quicksand"; // TAMAÑO DE LETRA DEL SUB TITULO
  ctx.fillStyle = "white"; // COLOR DEL SUB TITULO

  const subtitleMetrics = ctx.measureText(subtitle); // CARGAMOS EL SUB TITULO ESTABLECIDO

  ctx.fillText(
    subtitle,
    canvas.width / 2 - subtitleMetrics.width / 2,
    (canvas.height * 3) / 4 + 60
  ); // DIBUJAMOS EL SUB TITULO CON LO DATOS ESTABLECIDOS ANTERIORMENTE

  // DIBUJAMOS EL AVATAR DEL USUARIO
  const avatarImage = await loadImage(avatar); // CARGAMOS EL AVATAR DEL USUARIO

  ctx.shadowColor = "rgba(0, 0, 0, 0.4)"; // COLOR/ENFOQUE DE LA SOMBRA
  ctx.shadowBlur = 15; // CANTIDAD DE ENFOQUE DE LA LETRA

  // CREAMOS EL BORDE DEL AVATAR
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 3, avatarRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();

  // AVATAR DEL USUARIO
  ctx.shadowColor = "transpant";

  ctx.beginPath();
  ctx.arc(
    canvas.width / 2,
    canvas.height / 3,
    avatarRadius - 5,
    0,
    Math.PI * 2
  );
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(
    avatarImage,
    canvas.width / 2 - (avatarRadius - 5),
    canvas.height / 3 - (avatarRadius - 5),
    avatarRadius * 2,
    avatarRadius * 2
  );

  return canvas.toBuffer();
};
