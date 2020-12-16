Gmailのノードです。

## 概要

Gmailからメールの中身などを取得してきます。

## インストール

```
npm i node-red-contrib-gmail-fetch
```

or

AdminタブからInstall

## 利用イメージ

### Get Last Message

* `Credentials`と`Token`を取得してJSON文字列で指定します。
* Qにはメールの検索クエリを記載します。

> ![](https://i.gyazo.com/90507acbd519c3eb8104cbc0fd4a0ad1.png)

トリガーはインジェクトノードなどと組み合わせて下さい。

> ![](https://i.gyazo.com/0fbd32904452f18885d2948b1e19297f.png)

## LINK

* [NodeRED](https://flows.nodered.org/node/node-red-contrib--gmail-fetch)
* [Libraries.io](https://libraries.io/npm/node-red-contrib--gmail-fetch)
* [npm](https://www.npmjs.com/package/node-red-contrib-gmail-fetch)

## release

* 2020/12/17: アルファ版 公開