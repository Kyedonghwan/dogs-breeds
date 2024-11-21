# All About Dog's Breeds

개의 breed 별로 사진을 볼 수 있는 페이지

- api : https://dog.ceo/dog-api/documentation/

# 요구사항

## GNB

- Home / Breeds / Favorites / Quiz

## PAGES

### HOME

- random photo gallery


### BREEDS ( route : /breeds/{breed}/{sub-breed} )

- breed 갤러리
- LNB
- breed / sub-breed 로 가는 2 depth menu
- api/breeds/list/all 를 통해 가져온 정보를 토대로 데이터를 구축
- 검색 기능
  - 검색에 입력된 키워드가 포함된 1 depth, 2depth 를 모두 검색
  - 1 depth 에 키워드가 있을 경우에 1 depth 와 속해 있는 2 depth를 모두 표시해줌
  - 2 depth에 키워드가 있을 경우에 1 depth 와 키워드가 있는 2depth 만 표시


- menu에서 선택한 breed의 9개씩 이미지를 볼 수 있고 이미지는 페이징 되어서 볼 수 있다.
- 이미지를 클릭하면 favorite 에 저장 / 한번 더 클릭하며 favorite 에서 삭제
- name : sub breed name + breed name / breed name only
- 페이징은 처음 이전 1 ~10 다음 끝
- 페이징은 선택된 페이지를 기준으로 이전 4 다음 5개를 보여준다 (ex ) << < 4 5 6 7 [8] 9 10 11 12 13 > >>
- 페이징의 인터랙션은 통상적인 기준을 따른다

### FAVORITES ( route : /favorites )

- 사진에 대한 favorite 가능
- LNB
  - breed 단위로 list up
- localStorage 에 저장

### QUIZ route : ( /quiz )

- breed 맞추기
- random photo 를 보고 객관식으로 breed 이름 맞추기
- 10문제
- score 보여주기


