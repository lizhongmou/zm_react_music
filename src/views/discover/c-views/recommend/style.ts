import styled from "styled-components"

export const RecommendWrapper = styled.div`
  /* 只有这个的子元素才可以使用 */
  > .content {
    border: 1px solid #d3d3d3;
    background-image: url(${require("@/assets/img/wrap-bg.png")});
    display: flex;

    > .left {
      /* padding: 20px; */
      width: 729px;
    }

    > .right {
      /* 如果不这样子设置就会有一部分看不见 */
      margin-left: 1px;
      width: 250px;
    }
  }
`
