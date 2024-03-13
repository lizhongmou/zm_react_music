import styled from "styled-components"

export const RankingWrapper = styled.div`
  .content {
    display: flex;

    height: 472px;
    margin-top: 20px;
    /* 设置背景，网易云这里真实是一个背景图 */
    background: url(${require("@/assets/img/recommend-top-bg.png")}) no-repeat;
    margin: 20px;
  }
`
