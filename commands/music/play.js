const { MessageEmbed } = require("discord.js");
var { getData } = require("spotify-url-info");

module.exports = {
  name: "재생",
  aliases: ["틀어", "노래"],
  description: "노래를 틀어줘요",
  cooldown: "5",
run: async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send("보이스채널에 먼저 들어가셔야 해요!")
    let string = args.join(" ")
    let playEmbed = new MessageEmbed()
    .setTitle("Hikari :heart:")
    .setColor("RANDOM")
    .addField("ㅑ재생 <URL>", "[수많은 사이트들을 지원해요!](https://ytdl-org.github.io/youtube-dl/supportedsites.html)\n**스포티파이도 가능해요, 단 `link.tospotify.com` 링크는 지원하지 않아요!**")
    .setTimestamp();
    if (!string) return message.channel.send(playEmbed).then(msg => {msg.delete({ timeout: 30000})})
    // spotify
    // |link\.tospotify\.com not supported now
    let spourl = /^(https?:\/\/)+?(www\.)?(open\.spotify\.com)\/(track)\/.+$/gi
    let spoplurl = /^(https?:\/\/)+?(www\.)?(open\.spotify\.com)\/(playlist)\/.+$/gi
    let sponoturl = /^(https?:\/\/)+?(www\.)?(link\.tospotify\.com)\/.+$/gi
    if (spourl.test(string)) {
        try {
        const spodata = await getData(string);
        const sposearch = spodata.name
        const spouri = spodata.uri
        message.delete();
        message.channel.send(`https://scannables.scdn.co/uri/plain/png/000000/white/640/${spouri}`)
        message.channel.send("<a:loading:775963839862145024> 로딩중..").then(msg => {msg.delete({ timeout: 5000})})
        return client.distube.play(message, sposearch)
        } catch (e) {
        message.channel.send(`에러TV)\`${e}\``)
        }
    } else if (spoplurl.test(string)) {
        try {
        return message.channel.send("유감스럽게도 스포티파이 플레이리스트는 지원하지 않아요.")
        } catch (e) {
        return message.channel.send("유감스럽게도 스포티파이 플레이리스트는 지원하지 않아요.")
        }
    } else if (sponoturl.test(string)) {
        try {
        return message.channel.send("유감스럽게도 `link.tospotify.com` 링크는 지원하지 않아요.")
        } catch (e) {
        return message.channel.send("유감스럽게도 `link.tospotify.com` 링크는 지원하지 않아요.")
        }
    } else if (!spourl.test(string) || !spoplurl.test(string) || !sponoturl.test(string)) {
    try {
        message.delete();
        message.channel.send("<a:loading:775963839862145024> 로딩중..").then(msg => {msg.delete({ timeout: 5000})})
        client.distube.play(message, string)
    } catch (e) {
        message.channel.send(`에러TV)\`${e}\``)
    }
}
}
}