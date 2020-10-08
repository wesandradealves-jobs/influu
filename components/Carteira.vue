<template>
  <div class="componente-carteira pb-3 px-4">
    <div class="row pt-4">
      <div class="col-8">
        <h3 class="titulo-componente-sub text-left">Minha carteira</h3>
        <p class="text-muted">Confira os seus dados financeiros</p>
      </div>
      <div class="col-4">
        <p>
          <a href="javascript:void(0)" @click="$router.push('/my-wallet/statements')" class="extrato text-right">Extrato</a>
        </p>
      </div>
    </div>

    <div class="row my-2">
      <div class="col-9">
        <p class="saldo">
          Seu saldo
          <br />R$
          <span class="valor">{{ getMyWalletBallance.ballance }}</span>
        </p>
      </div>
      <div class="col-3">
        <button class="btn btn-primary resgatar float-right">resgatar</button>
      </div>
    </div>

    <hr />

    <div class="row">
      <div class="col">
        <p class="movimento">Saídas</p>
        <h4 class="valor-movimento">
          <i class="icone-saida"></i> R$
          <span>{{ getMyWalletBallance.debit }}</span>
        </h4>
      </div>
      <div class="col">
        <p class="movimento">Entrada</p>
        <h4 class="valor-movimento">
          <i class="icone-entrada"></i> R$
          <span>{{ getMyWalletBallance.credit }}</span>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import { getMyWalletBallance } from '~/business/services/dash-service';

export default {
  data: () => ({
    getMyWalletBallance: {}
  }),
  async mounted() {
    try {
      this.getMyWalletBallance = await getMyWalletBallance(this.$apollo);
    } catch (e) {}
  }
};
</script>

<style>
/* componente carteira */
.titulo-componente-sub {
  font-family: "nunitoregular";
  position: relative;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 43px;
  color: #22285a;
}
.text-muted {
  font-family: "nunitoregular";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #8c8d8f;
}
h3 {
  margin-bottom: -6px;
}
.extrato {
  font-family: "nunitoregular";
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 43px;
  color: #8c8d8f;
  display: block;
  text-decoration: none;
  margin-left: auto
}
.saldo {
  font-family: "nunitoregular";
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  color: #3a3939;
}
.valor {
  font-weight: bold;
  color: greenyellow;
}
.resgatar {
  text-transform: uppercase;
  font-family: "nunitoregular";
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 12px;
  color: #ffffff;
  background: linear-gradient(90deg, #872f7f 0%, #701668 100%);
  border: none;
  padding: 13px 20px 11px;
  border-radius: 8px;
}
p.movimento {
  font-family: "nunitoregular";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 43px;
  color: #333332;
  margin-bottom: -10px;
}
.valor-movimento {
  font-family: "nunitoregular";
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 43px;
  color: rgba(129, 129, 129, 0.8);
}
.valor-movimento span {
  color: #8c8d8f;
  font-size: 24px;
}
.icone-saida {
  content: url("./../assets/img/home/icons/saida.svg");
  background: #ffffff;
  box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 5px;
  width: 25px;
  position: relative;
  top: 5px;
}
i.icone-entrada {
  content: url("./../assets/img/home/icons/entrada.svg");
  background: #ffffff;
  box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 5px;
  width: 25px;
  position: relative;
  top: 5px;
}
</style>
