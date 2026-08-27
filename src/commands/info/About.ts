import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { I18N } from "../../structures/I18n";
import { Command, type Context, type Lavamusic } from "../../structures/index";
import { EmbedLinks, ReadMessageHistory, SendMessages, ViewChannel } from "../../utils/Permissions";

export default class About extends Command {
	constructor(client: Lavamusic) {
		super(client, {
			name: "about",
			description: {
				content: I18N.commands.about.description,
				examples: ["about"],
				usage: "about",
			},
			category: "info",
			aliases: ["ab"],
			cooldown: 3,
			args: false,
			vote: false,
			player: {
				voice: false,
				dj: false,
				active: false,
				djPerm: null,
			},
			permissions: {
				dev: false,
				client: [SendMessages, ReadMessageHistory, ViewChannel, EmbedLinks],
				user: [],
			},
			slashCommand: true,
			options: [],
		});
	}

	public async run(client: Lavamusic, ctx: Context): Promise<any> {
		const inviteButton = new ButtonBuilder()
			.setLabel(ctx.locale(I18N.buttons.invite))
			.setStyle(ButtonStyle.Link)
			.setURL(
				`https://discord.com/api/oauth2/authorize?client_id=${client.env.CLIENT_ID}&permissions=8&scope=bot%20applications.commands`,
			);
		const supportButton = new ButtonBuilder()
			.setLabel(ctx.locale(I18N.buttons.support))
			.setStyle(ButtonStyle.Link)
			.setURL("https://discord.gg/QRqdUVmxKA");
		const row = new ActionRowBuilder<ButtonBuilder>().addComponents(inviteButton, supportButton);
		const embed = this.client
			.embed()
			.setAuthor({
				name: "ZENIN CLAN!",
				iconURL:
					"https://cdn.discordapp.com/attachments/1542574105713315990/1542584416486957077/file_0000000063c882119c5d243c067c9dda.png?ex=6a91c330&is=6a9071b0&hm=933e15d3b7ba76b44cf4c04b411ef1d68d4527f74cc4d99a75980b250994ffa9&",
			})
			.setThumbnail(
				"https://cdn.discordapp.com/attachments/1542574105713315990/1542584416486957077/file_0000000063c882119c5d243c067c9dda.png?ex=6a91c330&is=6a9071b0&hm=933e15d3b7ba76b44cf4c04b411ef1d68d4527f74cc4d99a75980b250994ffa9&",
			)
			.setColor(this.client.color.main)
			.addFields(
				{
					name: ctx.locale(I18N.commands.about.fields.support),
					value: "[Here](https://discord.gg/QRqdUVmxKA)",
					inline: true,
				},
				{
					name: "\u200b",
					value: ctx.locale(I18N.commands.about.fields.description),
					inline: true,
				},
			);
		await ctx.sendMessage({
			content: "",
			embeds: [embed],
			components: [row],
		});
	}
}
