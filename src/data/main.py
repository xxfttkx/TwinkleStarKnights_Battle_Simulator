import os
from urllib.parse import urljoin
import requests
from bs4 import BeautifulSoup
import json

def table_to_json(url):
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)
    response.encoding = 'utf-8'
    soup = BeautifulSoup(response.text, 'html.parser')
    table = None
    tables = soup.find_all("table")
    print(f"Found {len(tables)} tables on the page.")
    for table in tables:
        first_row = table.find("tr")
        first_cell = first_row.find(['td', 'th']) if first_row else None
        if first_cell:
            text = first_cell.get_text(strip=True)
            # 这就是角色表
            if(text=='No'):
                table = table
                break
    
    print(f"table found: {table is not None}")
    # 提取表头
    headers = [th.get_text(strip=True) for th in table.find_all('tr')[0].find_all(['th', 'td'])]
    print("Headers:", headers)
    data = []
    for row in table.find_all('tr')[1:]:
        cells = row.find_all(['td', 'th'])
        if len(cells) != len(headers):
            continue
        item = {}
        for i in range(len(headers)):
            cell = cells[i]
            if headers[i] == "画像":
                img_tag = cell.find("img")
                if img_tag:
                    image_url = img_tag.get("data-src") or img_tag.get("src")
                    item[headers[i]] = urljoin(url, image_url)
                else:
                    item[headers[i]] = ""
            else:
                item[headers[i]] = cell.get_text(strip=True)
        data.append(item)


    return data

print("start")
# 示例使用
url = "https://twinklestarknights.wikiru.jp/?キャラクター一覧"
json_data = table_to_json(url)


script_dir = os.path.dirname(os.path.abspath(__file__))
output_path = os.path.join(script_dir, "characters_all.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(json_data, f, ensure_ascii=False, indent=2)

