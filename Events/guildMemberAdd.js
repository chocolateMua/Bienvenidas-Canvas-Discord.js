const { EmbedBuilder, AttachmentBuilder } = require("discord.js"); // IMPORTAMOS LAS VARIABLES DE LA LIBRERIA DE DISCORD.JS
const generateImage = require("../Utils/Canvas/welcomeImage"); // IMPORTAMOS LA CREACION DE IMAGEN Y TEXTO DE WELCOMEIMAGE

module.exports = async (member) => {
  const buffer = await generateImage(member); // CREAMOS EL BUFFER USANDO EL GENERATEIMAGE QUE SE GENERO ANTERIORMENTE
  const attachment = new AttachmentBuilder(buffer, {
    name: "generated-image.png",
  }); // GENERAMOS EL ATTACHMENT / IMAGEN DE LAS BIENVENIDAS CON EL BUFFER

  const embed = new EmbedBuilder() // USAMOS EMBEDBUILDER PARA CREAR LA BIENVENIDA
    .setTitle(`${member.user.displayName} bienvenido a la comunidad ✨`) // COLOCAMOS UN TITULO AL EMBED INDICANDO QUE USUARIO SE UNIO
    .setColor("Random") // ESTABLECEMOS EL COLOR DEL EMBED POR DEFECTO ESTA EN AZUL
    .setDescription(
      `Nos alegra de recibirte en la comunidad, recuerda hecharle un vistaso a los canales de verificación y chats del servidor para poder compartir experiencia con la comunidad!
        
        No te olvides de leer las $NORMAS para evitar cualquier infracción.
        Esperemos que pase una buena estancia en nuestro servidor!`
    ) // ESTABLEMESMO LA DESCRIPCION DEL EMBED SE PUEDE EDITAR AL GUSTO
    .setImage(`attachment://generated-image.png`); // ESTABLECEMOS LA IMAGEN QUE ESTRAEMOS DEL ATTACHEM / BUFFER;

  const channel = member.guild.channels.cache.get("1265075744418037874"); // ESTABLECEMOS EL CANAL CONDE SE ENVIARA EL EMBED

  await channel.send({
    content: `${member}`, // ENVIAMOS EL CONTENIDO EN LA PARTE DE ARRIBA DEL EMBED
    embeds: [embed], // ENVIAMOD EL EMBED QUE CREAMOS ANTERIORMENTE
    files: [attachment], // MANDAMOS LA IMAGEN DENTRO DEL EMBED EN FORMATO FILES
  });
};
