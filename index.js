require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// ====== CONFIG ======
const GUILD_ID = '1171782765960765500';
const VOICE_CHANNEL_ID = '1460588156557721712';
const WELCOME_CHANNEL_ID = '1379020078367903754';
// ====================

// Ready (log)
client.once('ready', () => {
  console.log(`Bot online: ${client.user.tag}`);
});

// Tự động treo voice khi bot online
client.on('ready', async () => {
  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    const channel = await guild.channels.fetch(VOICE_CHANNEL_ID);

    if (!channel || channel.type !== 2) {
      console.log('Không tìm thấy voice channel hoặc sai loại channel');
      return;
    }

    joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: true
    });

    console.log('Bot đã treo voice');
  } catch (err) {
    console.error('Lỗi khi treo voice:', err);
  }
});

// Chào member mới
client.on('guildMemberAdd', (member) => {
  const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);
  if (!channel) return;

  channel.send(
    `Chào mừng ${member} đã gia nhập DreamyChilling! Chúc bạn có khoảng thời gian thật vui vẻ tại đây.`
  );
});

// Login bằng TOKEN trong .env
client.login(process.env.TOKEN);
