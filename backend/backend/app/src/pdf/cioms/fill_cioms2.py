from typing import List
import fitz
import os
import secrets

from app.src.layers.domain import cioms_models

CIOMS_PDF_PATH = os.path.join(os.path.dirname(__file__), "cioms-form1.pdf")
CIOMS_CONTINUE_PATH = os.path.join(os.path.dirname(__file__), "cioms-continuation2.pdf")

# FIRST PAGE
# inclusive
lens = {"1": 20, "1a": 20, "2a": 5, "3": 5, "4": 5, "5": 5, "6": 5, "7+13":500, "14": 100, "15": 45, "16": 20, "17": 60, "18": 45, "19": 45, "22": 160, "23": 160, "24a": 140, "24c": 20, "DATE OF THIS REPORT": 20, "24b": 45}

one_line_fields = ["1", "1a", "2a", "3", "4", "5", "6", "15", "16", "17", "18", "19", "24b", "24c", "DATE OF THIS REPORT"]
how_many_lines = {"7+13": 11, "14":2, "22": 3, "23": 3, "24a": 4}
for x in one_line_fields:
	how_many_lines[x] = 1

line_length = {"7+13": 64, "14": 64, "22": 80, "23": 80, "24a": 40}

# real for 7+13 is more around 750-800, but there can be imbalanced lines

# SECONDARY PAGE
how_many_lines_2 = {"7+13": 20, "14": 5, "17": 5, "22": 5, "23": 5, "24a": 5}
line_length2 = {"7+13": 100, "14": 100, "17": 100, "22": 100, "23": 100, "24a": 100}
lens2 = {how_many_lines_2[x] * line_length2[x] for x in how_many_lines_2}

fields_2 = [x for x in line_length2]

human_names = {"1": "PATIENT INITIALS", "1a": "COUNTRY", "2a": "AGE", "3": "SEX", "4": "REACTION ONSET DAY", "5": "REACTION ONSET MONTH", "6": "REACTION ONSET YEAR", "7+13": "DECRIBE REACTIONS", "14": "SUCPECT DRUGS", "15": "DAILY DOSE(S)", "16": "ROUTE(S) OF ADMINISTRATION", "17": "INDICATION(S) FOR USE", "18": "THERAPY DATES (from/to)", "19": "THERAPY DURATION", "22": "CONCOMITANT DRUG(S) AND DATES OF ADMINISTRATION", "23": "OTHER RELEVANT HISTORY", "24a": "NAME AND ADDRESS OF MANUFACTURER", "24b": "MFR CONTROL NO.", "24c": "DATE RECEIVED BY MANUFACTURER", "DATE OF THIS REPORT": "DATE OF THIS REPORT"}

def count_lines(x: str, field: str) -> int:
	if len(x) == 0:
		return 0
	lines = x.split("\n")

	long_lines_add = 0

	if field in line_length:
		for line in lines:
			long_lines_add += len(line) // line_length[field]

	return len(lines) + long_lines_add


def count_lines2(x: str, field: str) -> int:
	if len(x) == 0:
		return 0
	lines = x.split("\n")

	long_lines_add = 0

	if field in line_length2:
		for line in lines:
			long_lines_add += len(line) // line_length2[field]

	return len(lines) + long_lines_add


def make_secondary_page(inp: dict) -> fitz.Document:
	continuation = fitz.open(CIOMS_CONTINUE_PATH)
	page = continuation.load_page(0)

	print(f"second page with {inp=}")

	inp = {x:inp[x].strip() for x in inp}

	to_insert = {
		"Cont_Description": inp.get("7+13", ""),
		"Cont_Drugs": inp.get("14", ""),
		"Cont_Indications": inp.get("17", ""),
		"Cont_Concominant": inp.get("22", ""),
		"Cont_History": inp.get("23", ""),
		"Cont_Man_addr": inp.get("24a", "")
	}

	for field in page.widgets():
		print(field)
		print(field.field_name)
		if field.field_name in to_insert:
			field.field_value = to_insert[field.field_name]
			field.text_fontsize = 8
			field._adjust_font()
			field.update()

	return continuation


def make_first_page(inp) -> fitz.Document:
	errors = validate_first_page(inp)

	if errors is not None:
		print("Errors:")
		print("\n".join(errors))
		exit(1)

	doc = fitz.open(CIOMS_PDF_PATH)
	page = doc.load_page(0)

	to_insert =	{
		"Initials": inp["1"],
		"Country": inp["1a"],
		"Day": inp["2"][0],
		"Month": inp["2"][1],
		"Year": inp["2"][2],
		"Age": inp["2a"],
		"Sex": inp["3"],
		"Day2": inp["4"],
		"Month2": inp["5"],
		"Year2": inp["6"],
		"Check1": inp["8"],
		"Check2": inp["9"],
		"Check3": inp["10"],
		"Check4": inp["11"],
		"Description": inp["7+13"],
		"Suspect_Drugs": inp["14"],
		"Daily_Doses": inp["15"],
		"Routes_of_Admin": inp["16"],
		"Indications": inp["17"],
		"Therapy": inp["18"],
		"Duration": inp["19"],
		"Check5": inp["20"] == "YES",
		"Check6": inp["20"] == "NO",
		"Check7": inp["20"] == "NA",
		"Check8": inp["21"] == "YES",
		"Check9": inp["21"] == "NO",
		"Check10": inp["21"] == "NA",
		"Check11": "STUDY" in inp["24d"],
		"Check12": "LITERATURE" in inp["24d"],
		"Check15": "HEALTH PROFESSIONAL" in inp["24d"],
		"Check13": inp["25a"] == "INITIAL",
		"Check14": inp["25a"] == "FOLLOW UP",
		"Concomitant": inp["22"],
		"History": inp["23"],
		"Manu_Name-Add": inp["24a"],
		"Control": inp["24b"],
		"Date_Rec": inp["24c"],
		"Report_Date": inp["DATE OF THIS REPORT"]
	}

	for field in page.widgets():
		if field.field_name in to_insert:
			field.field_value = to_insert[field.field_name]
			field.text_fontsize = 8
			if field.field_name == "Manu_Name-Add":
				field.text_fontsize = 7
			field._adjust_font()
			field.update()

	return doc


def cut_first_page(inp: dict) -> tuple[dict, dict | None]:
	i1, i2 = {}, {}
	for field in inp:
		if field in fields_2:
			continue

		if field not in how_many_lines:
			i1[field] = inp[field]
			continue

		if count_lines(inp[field], field) > how_many_lines[field] or len(inp[field]) > lens[field]:
			inp["7+13"] += "\n\n" + human_names[field] + ":\n" + inp[field] + "\n\n"
			inp[field] = "s. 7+13"

		i1[field] = inp[field]

#	print(f"{inp['7+13'] = }")

	for field in fields_2:
		r1, r2 = inp[field], ""

		if count_lines(r1, field) <= how_many_lines[field]:
			i1[field] = r1
			continue

		while count_lines(r1, field) +1 > how_many_lines[field]:
			lines = r1.split("\n")
			r2 = "\n".join([lines[-1]] + r2.split("\n"))
			r1 = "\n".join(lines[:-1])
			#print(f"{r1=} {count_lines(r1, field)=} {r2=}")

		i1[field] = (r1 + "\n(see cont.)").strip()
		if r2.strip() != "":
			i2[field] = r2

	if len(i2) == 0:
		i2 = None

	return i1, i2


def cut_second_page(inp: dict) -> tuple[dict, dict | None]:
	i1, i2 = {}, {}
	for field in inp:
		r1, r2 = inp[field], ""

		if count_lines2(r1, field) <= how_many_lines_2[field]:
			i1[field] = r1
			continue

		while count_lines2(r1, field) + 1 > how_many_lines_2[field]:
			lines = r1.split("\n")
			r2 = "\n".join([lines[-1]] + r2.split("\n"))
			r1 = "\n".join(lines[:-1])

		i1[field] = r1.strip() + "\n(see cont.)"
		if r2 != "":
			i2[field] = r2

	if len(i2) == 0:
		i2 = None

	return i1, i2



def get_pages(inp: dict | None, page_number: int) -> List[fitz.Document]:
	if inp is None:
		return []

	if page_number == 1:
		inp1, next_inp = cut_first_page(inp)
		res = [make_first_page(inp1)]
		res.extend(get_pages(next_inp, 2))
		return res

	i1, i2 = cut_second_page(inp)
	res = [make_secondary_page(i1)]
	res.extend(get_pages(i2, page_number+1))

	return res


#sec_page = make_secondary_page(inp)

def validate_first_page(inp):
	res = []

	for field in how_many_lines:
		if count_lines(inp[field], field) > how_many_lines[field]:
			res.append(f"field {field} should be {how_many_lines[field]} line/s")

	if any([len(x) > 10 for x in inp["2"]]):
		res.append("Date of birth is too long, should be less than 10 symbols")

	for field in lens:
		if len(inp[field]) > lens[field]:
			res.append(f"Length of field {field} is too big, should be <= {lens[field]}")

	if len(res) == 0:
		return None

	return res


def merge_pdf(doc: fitz.Document, pdf: fitz.Document):
	doc.insert_pdf(pdf)

	s_page = doc.load_page(-1)
	for field in pdf.load_page(0).widgets():
		s_page.add_widget(field)


def convert_to_internal_model(inp_model: cioms_models.CIOMS) -> dict:
	field_mapping = { x:x.replace("p", "")  for x in inp_model.model_dump() if x not in ["is_follow_up", "date_of_this_report"] }
	field_mapping["p7_and_p13"] = "7+13"

	res = {}

	model_fields = inp_model.model_dump()
	for field in field_mapping:
		res[field_mapping[field]] = model_fields[field]

	res["25a"] = "FOLLOW UP" if model_fields["is_follow_up"] else "INITIAL"
	res["DATE OF THIS REPORT"] = model_fields["date_of_this_report"]

	return res



def create_cioms_pdf(inp_model: cioms_models.CIOMS) -> str:
	inp = convert_to_internal_model(inp_model)

	pages = get_pages(inp, 1)

	doc = pages[0]
	for page in pages[1:]:
		merge_pdf(doc, page)

	out_path = "/tmp/" + secrets.token_hex() + ".pdf"
	doc.save(out_path)
	return out_path

