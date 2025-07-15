// 단계별 엔케팔린 해금
document.getElementById("enk26").addEventListener("change", function () {
  const enk52 = document.getElementById("enk52");
  const enk78 = document.getElementById("enk78");
  if (this.checked) {
    enk52.disabled = false;
  } else {
    enk52.checked = false;
    enk78.checked = false;
    enk52.disabled = true;
    enk78.disabled = true;
  }
});

document.getElementById("enk52").addEventListener("change", function () {
  const enk78 = document.getElementById("enk78");
  if (this.checked) {
    enk78.disabled = false;
  } else {
    enk78.checked = false;
    enk78.disabled = true;
  }
});

document.getElementById("bokgak1").addEventListener("change", function () {
  const b2 = document.getElementById("bokgak2");
  const b3 = document.getElementById("bokgak3");
  if (this.checked) {
    b2.disabled = false;
  } else {
    b2.checked = false;
    b2.disabled = true;
    b3.checked = false;
    b3.disabled = true;
  }
});

document.getElementById("bokgak2").addEventListener("change", function () {
  const b3 = document.getElementById("bokgak3");
  if (this.checked) {
    b3.disabled = false;
  } else {
    b3.checked = false;
    b3.disabled = true;
  }
});

function calculate() {
  const weeks = parseInt(document.getElementById("weeks").value);
  let total = 0;
  let details = [];

  // 공통 보상
  total += weeks * 300;
  total += weeks * 750;
  details.push(`[공통 보상]`);
  details.push(`정기 점검 보상: 300광기 × ${weeks}주 = +${300 * weeks}광기`);
  details.push(`거던 주간 보상: 750광기 × ${weeks}주 = +${750 * weeks}광기`);
  details.push("");

  // 0.5장 이벤트 보상
  const bokgakBoxes = document.querySelectorAll(".bokgak");
  let bokgakCount = 0;
  bokgakBoxes.forEach(box => { if (box.checked) bokgakCount++; });
  const oneEvent = 40 * 13 + 650 + 2600;
  const eventBonus = oneEvent * bokgakCount;
  total += eventBonus;
  details.push(`[0.5장 이벤트 보상]`);
  details.push(`(스테이지 보상 40광기 × 13스테이지 + EX 클리어 보상 650광기 + 이벤트 교환소 보상 2600광기(20티켓)) × ${bokgakCount}개 = +${eventBonus}광기`);
  details.push("");

  // 월정액 / 반정액
  if (document.getElementById("monthly").checked) {
    const monthly = 65 * 7 * weeks;
    total += monthly;
    details.push(`월정액: (65광기 × 7일) × ${weeks}주 = +${monthly}광기`);
  }
  if (document.getElementById("halfMonthly").checked) {
    const half = 39 * 7 * weeks;
    total += half;
    details.push(`반정액: (39광기 × 7일) × ${weeks}주 = +${half}광기`);
  }

  // 티켓 패키지
  if (document.getElementById("ticket").checked) {
    let count = 0, ticketBonus = 0;
    for (let i = 1; i <= weeks; i++) {
      if (i % 2 === 0) {
        ticketBonus += 5200;
        count++;
      }
    }
    total += ticketBonus;
    details.push(`티켓 패키지: 5200광기 × ${count}회(짝수 주차) = +${ticketBonus}광기`);
  }

  // 발푸르기스의 밤 이벤트
  if (document.getElementById("walpurgis").checked) {
    const wal = 2080 + 500;
    total += wal;
    details.push(`[발푸르기스의 밤 이벤트]`);
    details.push(`(이벤트 미션 보상 2080광기(16티켓) + 추가 보상 500광기) = +${wal}광기`);
  }

  details.push("");

  // 엔케팔린 감점
  let enkTotal = 0;
document.querySelectorAll(".enk").forEach(box => {
  if (box.checked) {
    const minus = parseInt(box.value) * 7 * weeks; // ← 여기에 weeks 추가
    enkTotal += minus;
    details.push(`엔케팔린 충전: ${box.value}광기 × 7일 × ${weeks}주 = -${minus}광기`);
  }
});
total -= enkTotal;

  // 유료 단챠 감점
const gacha = parseInt(document.querySelector('input[name="gacha"]:checked').value);
if (gacha > 0) {
  const gachaMinus = gacha * 7 * weeks;
  total -= gachaMinus;
  details.push(`일일 유료 단챠: ${gacha}광기 × 7일 × ${weeks}주 = -${gachaMinus}광기`);
}


  // 총합
  details.push(`\n[총합]`);
  details.push(`= ${total >= 0 ? '+' : ''}${total}광기`);

  // 총합 표시 따로
document.getElementById("total").textContent = `[총합] = ${total >= 0 ? '+' : ''}${total}광기`;

// 세부 내역은 따로 표시
document.getElementById("result").innerHTML = details.map(line => `<div>${line}</div>`).join("");
}
