import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import type { Player } from "lavalink-client";
import { I18N, t } from "../structures/I18n";
import config from "../config";

function getButtons(player: Player): ActionRowBuilder<ButtonBuilder>[] {
	const buttonData = [
		{
			customId: "previous",
			style: ButtonStyle.Secondary,
			emoji: "config.emoji.previous",
		},
		{
			customId: "rewind",
			style: ButtonStyle.Secondary,
			emoji: "config.emoji.rewind",
		},
		{
			customId: "resume",
			style: player?.paused ? ButtonStyle.Success : ButtonStyle.Secondary,
			emoji: player?.paused ? "config.emoji.resume" : "config.emoji.pause",
		},
		{
			customId: "forward",
			style: ButtonStyle.Secondary,
			emoji: "config.emoji.forward",
		},
		{
			customId: "skip",
			label: t(I18N.buttons.skip),
			style: ButtonStyle.Secondary,
			emoji: "config.emoji.skip",
		},
		{
			customId: "vol_down",
			style: ButtonStyle.Secondary,
			emoji: "config.emoji.volume.down",
		},
		{
			customId: "loop",
			style: player?.repeatMode !== "off" ? ButtonStyle.Success : ButtonStyle.Secondary,
			emoji: "config.emoji.loop.none",
		},
		{
			customId: "stop",
			style: ButtonStyle.Danger,
			emoji: "config.emoji.stop",
		},
		{
			customId: "shuffle",
			label: t(I18N.buttons.shuffle),
			style: ButtonStyle.Secondary,
			emoji: "config.emoji.shuffle",
		},
		{
			customId: "vol_up",
			style: ButtonStyle.Secondary,
			emoji: "config.emoji.volume.up",
		},
	];

	return buttonData.reduce((rows, { customId, label, style, emoji }, index) => {
		if (index % 5 === 0) rows.push(new ActionRowBuilder<ButtonBuilder>());

		const button = new ButtonBuilder().setCustomId(customId).setStyle(style).setEmoji(emoji);
		if (label) button.setLabel(label);
		rows[rows.length - 1].addComponents(button);
		return rows;
	}, [] as ActionRowBuilder<ButtonBuilder>[]);
}

export { getButtons };
