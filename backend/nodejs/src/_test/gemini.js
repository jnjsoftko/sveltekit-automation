import { GoogleGemini } from "jnj-lib-google";


// const generationConfig = {
//     stopSequences: ["red"],
//     maxOutputTokens: 200,
//     temperature: 0,
//     topP: 0.1,
//     topK: 16,
// }
// const generationConfig = {
//     maxOutputTokens: 8000,
//     temperature: 0,
//     topP: 0.1,
//     topK: 16,
// }
// // // const model = "Gemini1.5Pro"
// const user = "bigwhitekmc"
// const gem = new GoogleGemini({user, generationConfig});
const gem = new GoogleGemini();
// console.log(gem.apiKey);
// let prompt = "다음에 나오는 글을 맞춤법에 맞도록 수정하고, 문장 단위로 줄바꿈을 해줘. 내용을 추가하거나 삭제하지는 말아줘\n\n'"
const content = `
우리가 일을 왜 하는지 직장 생활을
왜 하는지 그 이유를 생각해 보면
여러 가지 이유가 있겠지만
현실적으로
돈을 벌기 위한 이유가 빠질 수가
없어요 그래서
돈 관리 잘하는 건 너무나 중요하고
그럴 때 몇 가지 문서로 관리를
하면은 효과적입니다 그래서 오늘은
제가 개인적으로 만들어서 사용하고
있는 자산관리 문서 소비관리 문서
그리고
경제적 자유 시뮬레이터이 세 가지
문서를 어떻게 사용하는지 소개하고
공유하려고 합니다
특히 경제적 자유를 어떻게 이룰 수
있을지 시뮬레이션 해주는 세 번째
문서는 제가 올해 마음 편하게 퇴사
결정을 할 수 있게 도와준 문서예요
또 자산과 소비 관리 문서가 있어야지
경제자유 시뮬레이터에 들어갈 때
숫자를 알 수 있기 때문에이 세 가지
문서 설명 보시고
영상 마지막에 구글 스프레시트 링크로
문서도 공유하니까
꼭 사용해 보시기 바랍니다
[음악]
돈 관리의 시작은 당연히 내 돈이
얼마나 있는지를 아는 거고 그냥
계좌를 보고 아는 것보다 내 자산들을
문서로 관리를 하면 도움이 됩니다
제가 사용하는 문서 보여드릴게요 저는
자산을
6가지로 분류를 해서 관리를 하는데
첫 번째는 예금이나 저축 같은 현금성
자산이에요 a 은행에
500만원 있다가 500만원 이렇게
쓰면 되는 거예요 두 번째는 주식
펀드 etf 같은 주식 자산들입니다
사용하시는 증권계사 들어가시면 내
현재 가치를 알 수 있기 때문에
여기다가 넣어 주시면 되고요 세
번째는
월급을 받으신다면
퇴직연금이 계속 쌓이고 있기 때문에
퇴직연금도 중요한 자산입니다 혹시
본인의 퇴직연금이 어떻게 운영되고
있는지 모르신다면
회사가 꼭 확인을 해보시고
dc형이라면
어떤 상품에 투자가 되고 있는지
꼭 확인해 보실 것을 추천드립니다네
번째로 혹시 가상 자산도 갖고
계시다면 거래소나 지갑에 있는 금액을
여기 넣어 주시면 되고 다섯 번째로
내집 마련을 하셨다 그러면 부동산
금액을 여기다가 넣어 주시면 돼요
그리고 뭐 다른 부동산이 있다 그러면
항목을 추가하시면 되고 부동산이
있다면 대출이 있을 가능성도 많기
때문에 자산과 부채를 구분하기 위해서
부채는 별도 테이블로 만들었고 대출은
여기다가 넣어 주시면 돼요 뭐 다른
대출이 있다 그러면 역시 추가하면
되겠죠 그럼 제가 이해를 돕기 위해서
순자산이 2억 정도 있는
어떤 사람의 사례를 만들어 놨어요
자산의 규모는 사람마다 다르기 때문에
금액에는 크게 신경을 안 쓰셔도 될
것 같고
본인의 자산들의 금액을 위에다가 모아
놓으면은
밑에 테이블에서 자산 종류별로 어느
비율로 가지고 있는지를 볼 수가
있어요 그리고 여기서는 부채를 제외한
나의 순자산을 보여주는 거죠 그래서
예를 들어서 지금 부동산 비중이
높으니까
앞으로는 주식 비중을 좀 늘려야겠다
아니면 아직은 가상화폐 잘
모르겠으니까 가상화폐 비중을
줄여야겠다 같은 본인을 만든 전략을
생각해 볼 수 있는 거죠 그리고이
표를 주기적으로 이렇게 업데이트를
하면은 나의 순자산이 어떻게
변하는지를 알 수 있기 때문에 굉장히
유용합니다 그리고 나의 자산들의
비중이 어떻게 변해오는지도 알 수
있고요 그리고 당연히 목표는 내
순자산을 우상향하게 만드는 거겠죠
두 번째 문서는 소비정리 문서예요
내가 돈을 어디에 어떻게 쓰는지 아는
건 너무나 중요하고
그러려면 내 소비 데이터를 정리해야
돼요 소비데이터 정리의 핵심은
항목을 나누어서 정리하는 거예요 저는
7가지 항목으로 나누어서 소비를
관리하는데
첫 번째는 이트예요 먹고 마시는 지출
밥 먹고 커피 먹고 술 먹고 이런
모든 지출을 여기다 넣고 두 번째는
주거와 관련된 항목이에요
관리비 전기세뿐만 아니라 살면서
필요한
각종 생활용품들 사는 비용을 다 여기
넣습니다 세 번째는 왜요
옷이나 화장품 뭐 미용실 세탁소 등등
입고 꾸미는 비용을 다 여기다 넣고네
번째는
엔조이 여행이나 문화생활 같은 즐기는
비용이고
조금 애매하지만 병원비도 여기다가
넣어요 다섯 번째는 에듀 교육 관련된
비용이고 아이 관련된 비용도 다 여기
넣습니다
여섯 번째는 라이드 대중교통 주유소
뭐 자동차 보험 같은 교통 관련된
항목들을 여기다가 넣어요 그리고 위에
들어가기 애매한 일회성 비용들은
7번째 기타에다가 넣습니다 이거는
제가 쓰는 분류니까 여러분들에 맞는
분류를 만드시면 될 것 같고
평소에 가계부 프로그램을 쓰면서
돈을 쓸 때마다 항목을 지정해주면
매달 혹은 매년 내가 각 항목에
얼마를 썼는지 알기가 편해요
빅데이터가 쌓여야지 소비 분석이
가능합니다
역시 제가 이해를 돕기 위해서 살을
하나 만들었어요
금액에는 큰 신경을 쓰지 마시고이
정도 분석이 되면은 내가 혹은 내
가족이
매년 필요한 예산이 어느 정도이고
비용을 줄이고 싶다면
어디서 줄일 수 있는지를 분석할 수
있습니다 그리고 이렇게 주기적으로
관리를 하면은 내 소비가 매년 어떻게
변하는지를 알 수도 있겠죠 그리고
당연히
앞서 정리한 자산이 늘어나는 곡선의
기울기보다 소비가 늘어나는 곡선의
기울기가 더
높으면 안 되겠죠
세 번째 문서는
경제적 자유 시뮬레이터에요
궁극적으로는 충분한 자산을 모아서
엄청난 부자는 아니더라도 돈 걱정
없이 살고 싶잖아요 그래서 내가
어떻게 해야지 경제적 자유 단계까지
갈 수 있는지
시뮬레이션을 해보고 싶었는데
인터넷에 떠도는 경제적 자유
계산기들이
그렇게 만족스럽지는 않았어요 그래서
제가 아는 모든 지식의
채취pt에 도움을 받아서이 문서를
만들었습니다
어떤 정보들이 들어가야 되는지를 쭉
설명드리고이 시뮬레이터를 어떻게
사용하는지 보여드릴게요 첫 번째는 내
나이에요 두 번째는 내 순자산 우리가
앞서 자산 문서에서 정리를 했죠네
부채를 제외한 순자산을 넣어 주시면
되고 그 다음은 자산 연수익률 내가
자산을 1년에 얼마 정도를 늘릴 수
있는지 뭐 돈을 예금에만 넣는다면 2
3% 정도일 테고 주식도 하신다면 더
높은 수익률도 가능하겠지만 반대로
까먹을 수도 있을 테고 예금가 주식을
같이 하면 보수적으로 한 4 5%
정도면 무난하지 않을까라는 생각이
들어요 그 다음에 연소비 나는 1년에
돈을 얼마나 쓰는지 우리가 앞서 본
소비 문서에서 정리를 했죠 그다음은
연 인플레이션인데
경제적 자유를 계산하기 위해서는
물가 오르는 거를 감안을 해야 돼요
연인플레이션은 시대에 따라서 다르기
때문에
경제 전문가 분들의 의견을 참고하면
좋을 것 같고 2 3% 정도면은 되지
않을까라고 개인적으로 생각을 합니다
그다음은 연수입 내가 1년에 돈을
얼마나 버는지 그 다음은 내 연수입의
증가율
웬만한 직장인이라면 수입이 나이가
들면서 증가하기 때문에 그 증가율을
넣으시면 되는데 일반화하기는 어렵겠죠
참고로 한국에 올해 연봉 평균
인상률이 4.6%라고 합니다 그
다음에 은퇴 나이 내가 계획하는 내
은퇴 나이겠죠 그 다음에 소비 감소
나이와 소비 감소 비율은
연소비가 인플레이션으로 매년 증가를
하는게이 모델이라고요 근데 나이가 더
들면 소비가 덜 활발할 것 같아서
그걸 반영을 하고 싶었어요 그래서
예를 들어서 소비 감소 나이에 70을
넣고 소비 감소 비율을
20을 넣으면 나는
70살에 내 소비는 20%가
감소한다고 반영을 하는 거예요 이게
완벽하진 않지만 노년의 소비 감소를
어느 정도 반영해 준다고 생각을 하고
이게 공감되지 않으신다면 여기
비워두시면 돼요 그 다음에는 우리가
앞서 말한 대로 퇴직연금이 계속
쌓이면
55세부터 연금으로 받을 수가
있다고요 1년에 나는 퇴직연금을
얼마나 받을지 이거는 계산해주는
계산기들이 인터넷에 많이 있거든요
그래서 그걸로 예상 금액을 넣으시면
됩니다 그리고이 모델에서는 85세까지
30년 동안 퇴직연금을 받는다고
가정을 했어요 그리고 살다 보면
경기침체가 한 번씩 와서 자산가치가
훅 떨어진다고요
2022년에도 이걸 경험했고 조금
나이가 있으신 분들은
2008년에도 경험했잖아요 그래서
이걸 감안하고 싶어서 내가 생각하기에
경기침체가 얼마나 자주 오고 그때마다
내 자산이 얼마나 하락할지를 얻는
거예요 그래서 예를 들어서 경기침체가
6년에 한 번씩 오고 그때마다
10%가 하락한다면 이렇게 누르면
됩니다 이걸 당연히 예상할 순 없지만
최악의 상황을 시뮬레이션 해보는 거죠
자 그럼 제가 사례로 숫자를 한번
넣어 봤어요 한 35세에 연 6천
정도 버는 어떤 분의 숫자를 제가
임의로 넣어봤습니다 여기 보이시는요
3개의 아름다운 수식이 합쳐져서 나는
몇 살까지 돈 걱정을 안 하고 살 수
있는지를 계산해 주는 거예요 그래서
이분의 경우를 보면은
쭉 내려가서
88세까지는 돈 걱정을 안 하고 내
소비를 유지할 수가 있습니다 여기는
인플레이션이 반영된 연소비가 쭉
나오고 우리 앞서 얘기한 70살의
20% 소비가 준다고 해서 70살에
소비가 줄었죠 그리고 내 수입이
어떻게 증가하는지 퇴직연금 요기 안
나옵니다 그리고 그 모든게 합쳐져서요
자산 칼럼에 내가 몇 살까지 돈이
남아 있는지가 계산되는 거죠 자
그러면 이제 우리가
숫자를 바꿔가면서 시뮬레이션 해 볼
수 있죠 아 인플레이션 2%는 너무
보수적이야 3%는 돼야지라고
바꿔보면은
77세가 되면 돈이 받았나요 자
그러면 아 은퇴를 65세 하면 어떻게
되지
86세까지는 괜찮아요 아 침체조계
6년은 좀 너무 빡세다 한 8년
정도로
옮겨 보면은
그러면 89세까지 뭐 이런 식으로
내가
숫자를 바꿔가면서 내 자산이 어떻게
변하는지를 알 수 있는
시뮬레이션이에요 아 내가 수입을 좀
더 늘려야겠다 아니면 수익률을 좀 더
늘려야겠다 은퇴를 좀 더 빨리 할 수
있겠는데 아니면 침체 대비해서 자산을
안전자산으로도 옮겨야 될까 등과 같이
경제적 자유에 더 가까워지기 위해서
정답을 줄 순 없지만
도움을 줄 수 있는게이
시뮬레이터입니다
[음악]
오늘 소개하고 싶은 아이템은
돈 관리 얘기를 했으니 제가 오랫동안
사용해온 네이버 가계부에요 제가
구글에서 오래 일해서 네이버 제품들을
그렇게 많이 안 써요 근데
한국에서 가계부는 네이버 가계부가
좋더라고요 아이폰 버전은 없는 걸로
알고 있어요 앱이 제가 좋아하는
버전은
노트북에서 브라우저로 들어가는 네이버
가계부에요 앞서 말한 소비 항모
분류하기도 좋고
월 연 단위로 분석도 굉장히 깔끔하게
해줍니다 오늘 미키피디아에서는 세
가지 자산관리 문서에 대해서 이야기를
했습니다
영상 밑에
구글독 링크로 문서를 공유했습니다
링크로 가셔서 사본으로 저장 후에
사용하시면 됩니다 비전문가인 제가
개인적으로 만들어서 사용하는 문서이니
여러분들이 여러분들에 맞게 수정하고
업그레이드 하셔서 사용하셔서 모두
부자 되셨으면 좋겠습니다 여기까지
보셨으면
구독 좋아요 아시죠 저는 그럼 다음
시간에 또 뵙겠습니다
감사합니다
[음악]
`

// prompt를 나누고, 각 부분을 처리하는 로직을 개선하여 '다 '를 기준으로 분할합니다.
const subtitleByGemini = async (content, maxPartLength = 3000) => {
    const gem = new GoogleGemini();
    const parts = [];
    let startIndex = 0;
    while (startIndex < content.length) {
        console.log(`===startIndex: ${startIndex}`)
        let endIndex = startIndex + maxPartLength;
        if (endIndex < content.length) {
            // '다 '가 나오는 마지막 위치를 찾아서 분할합니다.
            const lastValidIndex = content.lastIndexOf('다 ', endIndex);
            endIndex = lastValidIndex !== -1 ? lastValidIndex + 2 : endIndex;
        }
        const partContent = content.substring(startIndex, Math.min(endIndex, content.length));
        let prompt = "다음에 나오는 글을 맞춤법에 맞도록 수정하고, 문장 단위로 줄바꿈을 해줘. 줄바꿈이 필요없는 곳은 줄을 이어주고, 내용을 추가하거나 삭제하지는 말아줘\n\n'"
        prompt += partContent + "'";
        const partAnswer = await gem.answer(prompt);

        parts.push(partAnswer);
        startIndex = endIndex; // 다음 부분의 시작점을 업데이트합니다.
    }
    return parts.join('\n');
}


const ans = await subtitleByGemini(content)
console.log(ans)
console.log(`prompt.length: ${content.length}`)