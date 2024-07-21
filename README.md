# Local Sui Explorer

Sui Explorer for your localnet.

![Sui Explorer for Localnet: Screenshot](https://repository-images.githubusercontent.com/797627100/052271ab-2ee5-4560-8c24-bda45edb608c)

_A fork of [sui-explorer](https://github.com/MystenLabs/sui-explorer), originally developed by MystenLabs and now discontinued._

## Requirements

- [Node (>= v20)](https://nodejs.org/en/download/)

## Install

```bash
# globally
npm install -g sui-explorer-local@latest
# or to your project:
npm install -D sui-explorer-local@latest
```

## Use

Start (on [http://localhost:9001/](http://localhost:9001/)):

```bash
sui-explorer-local start
```

Stop:

```bash
sui-explorer-local stop
```

Restart:

```bash
sui-explorer-local restart
```

## Troubleshot

To display logs for the PM2 process manager, which powers the app, run this command:

```bash
npx pm2 logs sui-explorer-local --nostream
```

## Usage examples

Sui Explorer Local is integrated into [Sui dApp Starter](https://github.com/kkomelin/sui-dapp-starter) and [Suibase](https://github.com/ChainMovers/suibase).

## License & copyright

Original version of [Sui Explorer](https://github.com/MystenLabs/sui-explorer) - &copy; [MystenLabs](https://github.com/MystenLabs), Apache-2.0

All [changes](./CHANGELOG.md) after Apr 10, 2024 are a subject of copyright of [Konstantin Komelin](https://github.com/kkomelin) and other involved [contributors](https://github.com/kkomelin/sui-explorer/graphs/contributors).
